'use strict';

import autoprefix from 'less-plugin-autoprefix';
import cleanCss from 'less-plugin-clean-css';

export default {
  options: {
    plugins: [
      new (autoprefix)({browsers: ['Android > 2.2','iOS >= 5.0']}),
      new (cleanCss)()
    ]
  },
  dev: {
    files: [{
      expand: true,
      ext: '.css',
      cwd: '<%=yo.app%>',
      src: [
        '**/*.less',
        '!common/css/{icon,repeat-x,repeat-y}.less'
      ],
      dest: '.tmp'
    }]
  },
  dist: {
    files: [{
      expand: true,
      ext: '.css',
      cwd: '<%=yo.app%>',
      src: [
        '**/*.less',
        '!common/css/{icon,repeat-x,repeat-y}.less'
      ],
      dest: '<%=yo.dist%>'
    }]
  }
};
