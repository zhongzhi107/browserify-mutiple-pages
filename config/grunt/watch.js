'use strict';

import appConfig from '../app';

export default {
  js: {
    files: ['<%=yo.app%>/**/main.js'],
    // tasks: ['browserify:dev']
  },
  less: {
    files: [
      // match all files ending with .less in the yo.app subdirectory
      // and all of its subdirectories.
      '<%=yo.app%>/**/*.less'
    ],
    tasks: ['newer:less:dev', 'newer:autoprefixer:dev']
  },
  icon: {
    files: [
      '<%=yo.app%>/common/images/**/{icons,repeat-x,repeat-y}/*.png',
      '!<%=yo.app%>/common/images/**/sprite.png'
    ],
    tasks: ['sprite']
  },
  livereload: {
    options: {
      livereload: appConfig.port.liveReload
    },
    files: [
      '.tmp/**/*{.css,main.js}',
      '<%=yo.app%>/**/*.{<%=template.ext%>,css,png,jpg,jpeg,gif,ttf,webp,svg}',
      '!<%=yo.app%>/node_modules/**'
    ]
  }
};
