'use strict';

export default {
  all: {
    files: [{
      expand: true, // Enable dynamic expansion
      cwd: '<%=yo.app%>', // Src matches are relative to this path
      src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
      dest: '<%=yo.dist%>' // Destination path prefix
    }]
  }
};
