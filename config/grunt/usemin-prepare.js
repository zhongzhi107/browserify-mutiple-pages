'use strict';

export default {
  options: {
    root: '<%=yo.dist%>',
    dest: '<%=yo.dist%>'
  },
  // Entrance files to find usemin block
  html: '<%=yo.dist%>/pages/**/*.html'
};
