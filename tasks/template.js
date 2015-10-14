/**
* 自定义task
* 将模板输出成html文件，现在支持jade,html,velocity三种模板
*/

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('template', function() {
    var engineType = grunt.config('template.engine');
    var path = require('path');
    var ext = grunt.config('template.ext');
    var dist, dir = grunt.config('template.root.dev');
    var macro = grunt.config('template.macro');
    var rootDist = grunt.config('template.root.dist');

    grunt.file.recurse(dir, function(abspath, rootdir, subdir, filename) {
      if (subdir !== 'layout' && '.' + ext === path.extname(abspath)) {
        var engine, html;
        var rename = filename.replace('.' + ext, '.html');

        if (engineType === 'jade' || engineType === 'velocity') {
          if (engineType === 'jade') {
            if (filename === 'index.jade') {
              engine = require('jade');
              html = engine.renderFile(abspath, {pretty: true});
            } else {
              return;
            }
          } else if (engineType === 'velocity') {
            var Velocity = require('velocity/lib/engine');
            engine = new Velocity({
              root: dir,
              template: abspath,
              macro: path.resolve(process.cwd(), dir, macro)
            });
            html = engine.render({});
          }
          dist = path.join(rootDist, subdir, rename);
          grunt.file.write(dist, html);
          grunt.log.writeln('File ' + dist + ' created');
        }
        if (engineType === 'html') {
          dist = abspath.replace(dir, rootDist);
          grunt.file.copy(abspath, dist);
          grunt.log.writeln('File ' + dist + ' copied');
        }
      }
    });
  });

};
