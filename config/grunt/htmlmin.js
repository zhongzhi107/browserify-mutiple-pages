'use strict';

export default {
  dist: {
    options: {
      //removeCommentsFromCDATA: true,
      // https://github.com/yeoman/grunt-usemin/issues/44
      collapseWhitespace: true,
      /*
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      */
      removeComments: true,
    },
    files: [{
      expand: true,
      cwd: '<%=yo.dist%>',
      src: '**/*.html',
      dest: '<%=yo.dist%>'
    }]
  }
};
