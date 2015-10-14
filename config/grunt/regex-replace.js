'use strict';
// TODO 用usemin的cdnroot来实现
export default {
  // 替换绝对路径为相对网页的相对路径
  nuomi: {
    src: '<%=yo.dist%>/**/*.{html,css,js}',
    actions: [
      {
        search: '(href|src)="\/(common|pages)\/', //url(/common/
        replace: '$1="../../$2/',
        flags: 'g'
      },
      {
        search: 'url\\(\\/common\\/',
        replace: 'url(../../common/',
        flags: 'g'
      }
    ]
  }
};
