'use strict';

export default {
  engine: 'jade', //'velocity',//jade|ejs|handbars|hogan
  ext: 'jade',//'vm',
  // macro: 'layout/default.vm',
  root: {
    dev: '<%=yo.app%>/pages',
    dist: '<%=yo.dist%>/pages',
  },
  data: {
    page: './data/page',
  },
};
