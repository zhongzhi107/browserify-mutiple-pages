'use strict';

export default {
  options: {
    configFile: '.eslintrc',
  },
  target: [
    'Gruntfile.es6',
    'config/**/*.js',
    '<%=yo.app%>/**/*.js',
    '!<%=yo.app%>/common/js/lib/**/*.js',
    '!<%=yo.app%>/common/js/components/**/*.js',
  ],
};
