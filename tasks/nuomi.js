/**
 * 生成百度糯米Hybrid
 * 根据r.js的输出日志文件build.txt
 * 删除已经打包的requirejs插件资源文件
 */

'use strict';

import util from 'util';
import path from 'path';

export default (grunt) => {

  grunt.registerTask('nuomi', 'Generate Baidu Nuomi config file.', () => {
    let dir = grunt.config('yo.dist');
    let templateRoot = grunt.config('template.root.dist');
    let url, data = {
      id: 'xxxhotel',
      version: grunt.config('qdr.version'),
      pages: []
    };
    let filename = 'config.json';
    let excludes = ['test', 'demo'];

    grunt.file.recurse(templateRoot, (abspath, rootdir, subdir) => {
      if (excludes.indexOf(subdir) < 0 && path.extname(abspath) === '.html') {
        url = abspath.replace(rootdir, '');
        data.pages.push({
          name: subdir,
          file: `/pages${url}`,
          login: false
        });
      }
    });

    let mapfile = path.join(dir, filename);
    let mapContent = JSON.stringify(data);
    grunt.file.write(mapfile, mapContent);
    grunt.log.subhead('Nuomi config.json is now:')
      .writeln('  ' + util.inspect(data, false, 4, true, true));
    grunt.log.writeln(`File ${mapfile} created`);
  });

};
