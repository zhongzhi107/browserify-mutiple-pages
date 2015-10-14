'use strict';

import url from 'url';
import path from 'path';
import fs from 'fs';
import app from '../app';

export default (grunt) => {
  let hostname = grunt.option('hostname') || '*';
  let port = grunt.option('port') || app.port.www;
  let rewriteRulesSnippet = require('grunt-connect-route/lib/utils').rewriteRequest;
  let mountFolder = (connect, dir) => {
    return connect.static(path.resolve(dir));
  };

  // parse velocity template
  function parserTemplate(req, res, next, type) {
    function requireUncached(module) {
      let requirePath = path.resolve(process.cwd(), module);
      delete require.cache[requirePath];
      return require(requirePath);
    }
    // 有些同步请求和异步请求使用的是同一个URL，这个通过header中参数来区分
    // 对异步请求不走模版解析逻辑
    //let isAjax = !!req.headers['x-requested-with'];

    let routerPage = requireUncached('config/router-page');
    let urlObject = url.parse(req.url);
    let template = routerPage[urlObject.pathname];
    let templateRoot = grunt.config('template.root.' + type);
    let ext = type === 'dev' ? grunt.config('template.ext') : 'html';
    let templateAbsPath = path.join(templateRoot, template + '.' + ext);
    let result, engine;

    if (fs.existsSync(templateAbsPath)) {
      let contextFile = grunt.config('template.data.page') + template;
      let context = {};

      if (fs.existsSync(contextFile + '.js')) {
        try {
          context = requireUncached(contextFile)(req, res);
        } catch (e) {
          grunt.log.writeln('');
          grunt.warn('File "' + contextFile + '.js" require failed.\n' + e);
        }
      }

      if (type === 'dev') {
        let engineType = grunt.config('template.engine');
        if (engineType === 'jade') {
          engine = require('jade');
          result = engine.renderFile(templateAbsPath, context);
        }
        if (engineType === 'html') {
          result = grunt.file.read(templateAbsPath);
        }
        if (engineType === 'velocity') {
          let Velocity = require('velocity/lib/engine');
          engine = new Velocity({
            root: templateRoot,
            template: templateAbsPath,
            macro: path.resolve(process.cwd(), grunt.config('template.root.dev'), grunt.config('template.macro'))
          });
          result = engine.render(context);
        }
      } else {
        result = grunt.file.read(templateAbsPath);
      }
      res.setHeader('Content-Type', 'text/html;charset=UTF-8');
      res.end(result);
    } else {
      next();
    }
  }

  return {
    rules: require('../router-api'),
    options: {
      port: port,
      hostname: hostname,
    },
    dev: {
      options: {
        livereload: app.port.liveReload,
        open: grunt.option('open'),
        middleware: (connect) => {
          return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, app.path.app),
            function(req, res, next) {
              return parserTemplate(req, res, next, 'dev');
            },
            rewriteRulesSnippet,
          ];
        }
      }
    },
    dist: {
      options: {
        keepalive: true,
        middleware: (connect) => {
          return [
            mountFolder(connect, app.path.dist),
            mountFolder(connect, grunt.config('template.root.dist')),
            function(req, res, next) {
              return parserTemplate(req, res, next, 'dist');
            },
            rewriteRulesSnippet
          ];
        }
      }
    },
  };
};
