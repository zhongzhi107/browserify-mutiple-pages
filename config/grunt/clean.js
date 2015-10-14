'use strict';

export default {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%=yo.dist%>/*',
        '!<%=yo.dist%>/.git*'
      ]
    }]
  },
  server: '.tmp'
};
