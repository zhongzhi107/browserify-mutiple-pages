'use strict';

export default {
  nuomi: {
    compression: 'DEFLATE',
    cwd: '<%=yo.dist%>',
    src: '<%=yo.dist%>/**/*',
    dest: '<%=yo.dist%>/zip/qunarhotel_<%=qdr.app%>_<%=qdr.version%>.zip'
  }
};
