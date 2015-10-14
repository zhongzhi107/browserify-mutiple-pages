'use strict';

export default {
  options: {
    browserifyOptions: {
      // require查找备用目录
      paths: ['.tmp', '<%=yo.dist%>']
    }
  },

  vendorDev: {
    src: [],
    dest: '.tmp/common/js/vendor.js',
    options: {
      require: [
        './<%=yo.app%>/common/js/lib/zepto',
        './<%=yo.app%>/common/js/lib/underscore',
        './<%=yo.app%>/common/js/lib/zepto-extend'
      ],
      alias: {
        zepto: './<%=yo.app%>/common/js/lib/zepto.js',
        underscore: './<%=yo.app%>/common/js/lib/underscore.js',
        zeptoExtend: './<%=yo.app%>/common/js/lib/zepto-extend.js'
      }
    }
  },

  vendorDist: {
    src: [],
    dest: '<%=yo.dist%>/common/js/vendor.js',
    options: {
      require: [
        './<%=yo.app%>/common/js/lib/zepto',
        './<%=yo.app%>/common/js/lib/underscore',
        './<%=yo.app%>/common/js/lib/zepto-extend'
      ],
      alias: {
        zepto: './<%=yo.app%>/common/js/lib/zepto.js',
        underscore: './<%=yo.app%>/common/js/lib/underscore.js',
        zeptoExtend: './<%=yo.app%>/common/js/lib/zepto-extend.js'
      }
    }
  },

  dev: {
    expand: true,
    cwd: '<%=yo.app%>/pages',
    src: ['**/main.js'],
    dest: '.tmp/pages',
    // ext: '.min.js',
    options: {
      // browserifyOptions: {
      //   // basedir: '.tmp',
      //   // paths: ['.', '.tmp'],
      // },
      watch: true,
      external: ['zepto', 'underscore', 'zeptoExtend'],
      transform: [['babelify', {stage: 0}], 'cssify', 'jadeify']
      // transform: ['stringify', ['babelify', { 'blacklist': ['strict'] }], 'cssify']
    }
  },

  dist: {
    expand: true,
    cwd: '<%=yo.app%>/pages',
    src: ['**/main.js'],
    dest: '<%=yo.dist%>/pages',
    // ext: '.min.js',
    options: {
      external: ['zepto', 'underscore', 'zeptoExtend'],
      transform: [['babelify', {stage: 0}], 'cssify', 'jadeify']
    }
  }
};
