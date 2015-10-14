'use strict';

import $ from 'zepto';
// import EventEmitter from 'events'; // +4.1k
// import _ from 'underscore'; //+5.7k
//import jadeTpl from './test3.jade'; //＋3.7k
//import {override} from 'core-decorators'; //＋13K
import Page from '../../common/js/base/page';

class Main extends Page {
  // events = {
  //   name: 'Joe2'
  // };
  // static ab = 'ab';

  // @readonly // 有bug
  // entree = 'steak';

  //@override
  render() {
    // 将jade模版编译到js中
    $('#test').append(''
      // jadeTpl({
      //   name: 'world',
      //   language: [ 'JavaScript', 'CSS', 'HTML' ]
      // })
    );
  }
}

// 将css编译到js中，
// 推荐在components开发时使用该方式
// 由于动态加载css会引起页面初始化时页面抖动，不推荐在页面开发时使用
// 引用pages/demo/style.less
// 注意路径的写法
require('pages/demo/style.css');
new Main();
