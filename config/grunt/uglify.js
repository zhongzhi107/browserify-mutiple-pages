'use strict';

export default {
  options: {
    //sourceMap: true,
    compress: {
      // Remove console function
      'drop_console': true,
      'drop_debugger': true,
      // Set global JavaScript varible value when uglify compressing
      'global_defs': {
        DEBUG: false,
        'DEPLOY_TYPE': process.env.DEPLOY_TYPE
      }
    }
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%=yo.dist%>',
      src: '**/*.js',
      dest: '<%=yo.dist%>',
    }]
  }
};
