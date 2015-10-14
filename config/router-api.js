/**
* @fileOverview Grunt URL rewrite rule config file
* @author <a href="mailto:zhong.zhi@163.com">Zhongzhi</a>
* @version 0.0.1
*
*/
'use strict';

export default {
  // 从上至下匹配，遇到第一个匹配的规则后就返回，通用配置写在最下面
  // 特殊配置
  // '^/js/common/(.*)' : 'http://localhost:3000/js/common/$1.js',

  // 通用配置
  '^/api/(.*)': 'http://192.168.205.68:3001/api/$1',
  // '^/api/(.*)': 'http://l-wap1.wap.dev.cn6.qunar.com:3001/api/$1'
  // '^/api/hotkeywords': 'require!/data/api/keywords/search-hot.js'
  '^/api2/(.*)': 'require!/data/api/$1.js',
  // '^/api/(.*)': 'http://localhost:3000/api/$1',
  //'^/api/(.*)': 'http://www.test.com/api/$1',
  // '^/h5/hybrid/usercenter4client': 'require!/app/data/api/usercenter/index.js',
  // '^/': 'require!/app/data/api/usercenter/index.js',
};
