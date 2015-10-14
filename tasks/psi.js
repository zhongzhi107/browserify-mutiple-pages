/**
* 自定义task
* 根据r.js的输出日志文件build.txt
* 删除已经打包的requirejs插件资源文件
*/

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('psi', 'Generate mapping file.', function() {
    var psi = require('psi');

    // get the PageSpeed Insights report
    psi('html5rocks.com', function (err, data) {
      console.log(data.score);
      console.log(data.pageStats);
    });

    // output a formatted report to the terminal
    psi.output('html5rocks.com', function (err) {
      if (err === 0) {
        console.log('done');
      }
    });
  });
};
