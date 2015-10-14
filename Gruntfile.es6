/**
* @fileOverview Gruntfile
* @author <a href="mailto:zhong.zhi@163.com">Zhongzhi</a>
* @version 0.0.1
*  Add time-grunt/jshint-style 2014/1/29
* @example
*   通用参数
*   > grunt --gruntfile=/home/webapp/src/Gruntfile.js --node-modules=/home/zhi.zhong
*   --gruntfile: 指定Gruntfile.js文件的位置，在项目根目录外运行Grunt会用到该参数
*   --node-modules: 指定开发环境依赖包的位置，只需要指定到node_modules父目录即可
*                   使用该参数便于在同一机器上运行多个分支时共享依赖包
*
*   serve命令参数
*   > grunt serve --hostname=localhost --port=9001
*   // --hostname: 指定自动打开浏览器的域名，默认值：localhost
*   // --port: 指定自动打开浏览器的端口号，默认值：9000
*   // --open  自动启动浏览器
*
*   预览编译后的文件
*   > grunt serve:dist
*
*   build编译参数
*   > grunt build --app-name=nuomi --app-versionv=1.0.1 --no-jshint --no-uglify
*   // --app-name: 宿主app名称
*   // --app-version: 指定编译输出包的版本号
*   // --deploy-type: 指定当前编译类型，取值可能是dev/beta/prod/prepare,分别对应的是dev/QA/正式/灰度发布
*   // --no-jshint: 编译过程禁用jshint检查
*   // --no-uglify: 编译过程不混淆JS代码
*/

'use strict';

import _ from 'lodash';

export default (grunt) => {
  // 定义编译类型，并将其存入运行环境变量中
  process.env.DEPLOY_TYPE = grunt.option('deploy-type') || '';

  // node_modules父目录
  let nodeModulesDir = grunt.option('node-modules') || '.';

  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('matchdep').filterAll('grunt-*').forEach(function(nodeModule) {
    if (nodeModulesDir) {
      let cwd = process.cwd();
      process.chdir(nodeModulesDir);
      grunt.loadNpmTasks(nodeModule);
      process.chdir(cwd);
    } else {
      grunt.loadNpmTasks(nodeModule);
    }
  });

  // 各模块运行所消耗的时间，可以用来指导优化编译过程
  require(nodeModulesDir + '/node_modules/' + 'time-grunt')(grunt);

  // 加载项目配置
  let configApp = require('./config/app');
  // 路径配置
  let appConfig = configApp.path;
  let qdrConfig = {
    version: process.env.version || grunt.option('app-version') || require('./package.json').version,
    app: process.env.app || grunt.option('app-name') || configApp.app
  };

  // Grunt configuration
  let config = {

    // 路径配置
    yo: appConfig,

    // 生成客户端打包配置参数
    qdr: qdrConfig,

    // 防止usemin concat时找不到block时编译报错
    concat: {
      foo: {}
    },

    /**
    * Run predefined tasks whenever watched file patterns are added, changed or deleted.
    */
    watch: require('./config/grunt/watch'),

    /**
    * Start a connect web server.
    */
    connect: require('./config/grunt/connect')(grunt),

    /**
    * Clean files and folders.
    */
    clean: require('./config/grunt/clean'),

    /**
    * Validate files with eslint.
    */
    eslint: require('./config/grunt/eslint'),

    /**
    * Copy files and folders.
    */
    copy: require('./config/grunt/copy'),

    /**
    * Minify PNG and JPEG images.
    */
    imagemin: require('./config/grunt/imagemin'),

    /**
    * Compile LESS files to CSS.
    */
    less: require('./config/grunt/less'),

    /**
    * Parse CSS and add prefixed properties and values by Can I Use database
    * for actual browsers. Based on Autoprefixer.
    */
    // autoprefixer: require('./config/grunt/autoprefixer'),

    /**
    * Minify files with UglifyJS.
    */
    uglify: require('./config/grunt/uglify'),

    /**
    * prepares the configuration to transform specific blocks in the scrutinized file into a single line,
    * targeting an optimized version of the files.
    * This is done by generating subtasks called generated for every
    * optimization steps handled by the Grunt plugins listed below.
    */
    useminPrepare: require('./config/grunt/usemin-prepare'),

    /**
    * Replaces references from non-optimized scripts, stylesheets and other assets
    * to their optimized version within a set of HTML files (or any templates/views).
    * homepage: https://github.com/yeoman/grunt-usemin
    */
    usemin: require('./config/grunt/usemin')(qdrConfig),

    /**
     * Converting a set of images into a spritesheet
     * and corresponding CSS variables.
     */
    sprite: require('./config/grunt/sprite'),

    /**
    * Static file asset revisioning through content hashing
    */
    rev: require('./config/grunt/rev'),

    // Convert templates to html files
    template: require('./config/grunt/template'),

    // 清除空目录
    cleanempty: require('./config/grunt/cleanempty'),

    // html代码压缩
    htmlmin: require('./config/grunt/htmlmin'),

    // 模块化加载器
    browserify: require('./config/grunt/browserify'),

    zip: require('./config/grunt/zip'),

    prompt: require('./config/grunt/prompt'),

    'regex-replace': require('./config/grunt/regex-replace')

  };

  // 加载配置项
  grunt.initConfig(config);

  // 加载自定义任务
  grunt.loadTasks('tasks');

  // Registration start a local web server tasks
  grunt.registerTask('serve', (target) => {
    let tasks = [];
    if (target === 'dist') {
      tasks = [
        'build',
        'configureRewriteRules',
        'connect:dist'
      ];
    } else {
      tasks = [
        'clean:server',
        'eslint',
        'less:dev',
        'browserify:vendorDev',
        'browserify:dev'
      ];
      if (!grunt.option('ignore-urlrewrite')) {
        tasks.push('configureRewriteRules');
      }
      tasks.push('prompt:ip', 'connect:dev', 'watch');
    }

    grunt.task.run(tasks);
  });

  // 旧的任务名称，已经更新为serve
  grunt.registerTask('server', (target) => {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  // 注册工程编译任务
  let buildTasks = [
    'clean:dist',
    'eslint',
    'copy:css',
    'copy:others',
    'sprite',
    'imagemin',
    'template',
    'useminPrepare',
    'less:dist',
    'browserify:vendorDist',
    'browserify:dist',
    'concat',
    'uglify',
    'rev:dist',
    'usemin',
    'htmlmin',
    'cleanempty',
    'nuomi',
    'regex-replace:nuomi',
    'zip:nuomi'
  ];
  if (grunt.option('no-jshint')) {
    buildTasks = _.remove(buildTasks, (item) => {
      return item !== 'jshint';
    });
  }
  if (grunt.option('no-uglify')) {
    buildTasks = _.remove(buildTasks, (item) => {
      return item !== 'uglify';
    });
  }
  grunt.registerTask('build', buildTasks);

  // 注册测试任务
  grunt.registerTask('test', [
    'clean:dist',
    'template',
    'useminPrepare'
  ]);

  // 注册Grunt默认任务
  grunt.registerTask('default', [
    'build'
  ]);
};
