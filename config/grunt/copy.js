'use strict';

export default {
  css: {
    expand: true,
    cwd: '<%=yo.app%>',
    dest: '.tmp/concat',
    src: [
      '**/*',
      '!**/*.less'
    ]
  },
  others: {
    expand: true,
    cwd: '<%=yo.app%>/common',
    dest: '<%=yo.dist%>/common',
    src: '**/*.{ttf,eot,otf,svg,woff,woff2,swf,mp3}'
  }
};
