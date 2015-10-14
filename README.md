# 使用说明

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## 前提

需要nodejs，版本 >0.10

如无nodejs环境，请到官方网站（[http://nodejs.org](http://nodejs.org)）下载、安装

## 步骤

```sh
# 更新为淘宝镜像
npm config set registry https://registry.npm.taobao.org

# 安装grunt-cli和PageSpeed Insights
npm install -g grunt-cli psi

# 安装项目依赖包
npm install
# 生产环境运行以下命令
# npm install -production

# 运行grunt本地服务器
grunt serve

#### 其他命令 ####
# 编译全站
grunt build

#######################
# 编译机上带路径参数编译
# --gruntfile: 指定Gruntfile.js文件的位置，在项目根目录外运行Grunt会用到该参数
# --node-modules: 指定开发环境依赖包的位置，只需要指定到node_modules父目录即可
#                 使用该参数便于在同一机器上运行多个分支时共享依赖包
# --deploy-type: 指定当前编译类型，取值可能是dev/beta/prod/prepare,分别对应的是dev/QA/正式/灰度发布
#######################
grunt --gruntfile=/home/webapp/src/Gruntfile.js --node-modules=/home/zhi.zhong

#######################
# server命令参数
# --hostname: 指定自动打开浏览器的域名，默认值：localhost
# --port: 指定自动打开浏览器的端口号，默认值：9001
# --open  启动浏览器
# --ignore-urlrewrite 禁止地址转发功能
#######################
grunt server --host=localhost --port=9001

# 预览编译后的文件
grunt server:dist
```
## 特点

### 已完成
* [babel]支持ES6
* [模板]支持jade
* [less]支持less
* [autoprefixer]根据[caniuse](http://caniuse.com)的数据自动补全浏览器厂商前缀
* [css sprite]支持自动生成CSS Sprite
* [css inline]支持将css编译到js中动态加载
* [imagemin]jpg/png图片无损压缩
* [jshint]jshint语法检查
* [rev]编译后的静态文件自动添加md5戳
* [router-page]开发环境支持模版与URL地址关系配置
* [router-api]开发环境支持同步／异步接口假数据
* [liveReload]开发环境下，静态文件修改后自动刷新浏览器

### TODO
* [psi]pagespeed性能优化(需要翻墙)
* 简化调试环境、解耦客户端依赖

### 约定
* main.js为页面的入口js文件

## 目录说明
```
...
├─.tmp          //运行时生成临时文件
├─app           //工程代码
│   ├─common    //静态资源
│   │   ├─css       //css or less
│   │   │   ├─icon.less       //自动合并css sprite生成的less变量文件
│   │   │   ├─repeat-x.less   //自动合并css sprite生成的less变量文件（横向平铺类型）
│   │   │   ├─repeat-y.less   //自动合并css sprite生成的less变量文件（纵向平铺类型）
│   │   │   └─pages           //页面相关的样式
│   │   ├─fonts     //字体
│   │   ├─images    //图片
│   │   │   ├─icon       //需要合并css sprite生成的图片
│   │   │   ├─repeat-x   //需要合并css sprite生成的图片（横向平铺类型）
│   │   │   └─repeat-y   //需要合并css sprite生成的图片（纵向平铺类型）
│   │   ├─js        //js or es6 or tpl
│   │   │   ├─components     //组件
│   │   │   ├─lib            //bower安装目录
│   │   │   └─utils          //单一功能函数
│   │   └─layout        //jade布局模板
│   └─pages    //页面模版和相关的js、前端模版
│       └─demo //单一功能函数
│           ├─demo.jade
│           ├─demo.less
│           ├─demo.tpl
│           └─main.js //页面js入口，名字是约定好的
├─config  
│   ├─grunt             //Gruntfile.js子配置文件
│   ├─app.js            //项目整体配置
│   ├─router-api.js     //异步请求与url对应关系配置
│   └─router-page.js    //模拟数据URL配置
├─data      //本地测试数据
│   ├─api   //页面初始化数据
│   └─page  //异步接口数据
├─docs          //文档  
├─prd           //编译输出目录  
├─tasks         //自定义grunt任务
├─.gitignore
├─.jshintrc     //jshint语法配置
├─Gruntfile.es6 //grunt主配置文件
├─Gruntfile.js  //grunt入口文件
├─package.json  //grunt依赖包配置文件
├─prebuild.js   //QDR编译前的预处理脚步，主要作用是读取／存储版本号信息
└─README.md
```

## 编码规范

### CSS
http://cssguidelin.es/

### JavaScript
https://github.com/airbnb/javascript

http://jscs.info/

### JSON
https://github.com/darcyliu/google-styleguide/blob/master/JSONStyleGuide.md

### git
https://github.com/aseaday/git-style-guide

#### 分支名称
* yyyymmdd_keyword
* 使用下划线链接
* keyword全部小写，不要太长，能大概标识当前分支的修改即可
* 项目如果需要同时修改前后端项目，尽量使用相同的名称
* 好的名称，如 20140124_searchinput， 20131227_safestring
* 不好的名称，如 20140124_search_input， 20140124_searchInput

### 图片
* 名称用减号 `-` 连接，不要使用下划线`_`
* 全部使用png24格式
* 单色图标需做成字体文件，以减少文件网络传输
* 避免在HTML中使用 <img> 插入图片，尽量在css中使用 background-image background-size展示图片

### 模板
* JavaScript原生方法、全局方法（包含$)等可以直接在模板中使用，如 <%-$.getDay(date)%>
* 所有变量输出均使用 <%-%>, 不使用 <%=%>, 特别是从querystring中获取的变量，
必须要用 <%-%> 输出，以防止XSS漏洞

### 文档
https://github.com/jsdoc3/jsdoc


## 路由说明
开发环境下有2种路由：

1. api —— 前端Ajax异步请求数据模拟，对应的配置文件是 [config/router-api.js](config/router-api.js)，
对应的数据在 [data/api](data/api)，可以配置成：
  * 本地假数据
  * 远程测试环境
  * 线上环境

2. page —— 设置模版文件和线上URL对应关系，对应的配置文件是 [config/router-page.js](config/router-page.js)，
对应的数据在 [data/page](data/page)

## 文件合并
目前支持2种文件合并方式：
* usemin的tag block方式
* browserify方式(推荐使用)

### usemin的tag block方式
通过html代码注释自我描述打包，不需要任何配置

#### css

```html
<!-- build:css /static/css/common.css -->
<link rel="stylesheet" href="/static/css/common.css"/>
<link type="text/css" rel="stylesheet" href="/static/css/ebooking.css">
<!-- endbuild -->
```

jade的写法

```jade
// build:css /static/css/common.css
link(href="/static/css/common.css")
link(href="/static/css/ebooking.css")
// endbuild
```

**代码功能说明**

`build:css`：指明编译方式

将`/static/css/common.css`和`/static/css/ebooking.css`文件
打包成`/static/css/common.css`一个文件

#### js

```html
<!-- build:js /static/js/common.js -->
<script src="/static/js/underscore.js"></script>
<script src="/static/js/zepto.js"></script>
<script src="/static/js/zepto-extend.js"></script>
<script src="/static/js/zepto.mockjax.js"></script>
<!-- endbuild -->
```

jade的写法
```jade
// build:js /static/js/localtour/localtour.js
script(src="/static/js/common/page.js")
script(src="/static/js/localtour/slider.js")
script(src="/static/js/localtour/index.js")
// endbuild
```

**代码功能说明**

`build:js`：指明编译方式

将`/static/js/underscore.js`等4个文件打包成`/static/js/common.js`一个文件

## less的使用
less文件存为 `.less` 后缀，引用时还是使用 `.css`后缀，
例如下面的文件对应着 `/common/css/test.less`，引用时应该这样写：

```html
<link rel="stylesheet" href="/common/css/test.css"/>
```


## 模拟数据的使用

1. 模拟数据文件保存路径需要和模板路径一一对应
2. 模拟数据文件其实是一个js模块化文件，支持js编程，传入参数保护 req 和 res，
在req中能获取到请求参数、cookie等信息，在res中能控制返回状态码、消息体、数据格式等信息

模拟数据分为2类

- 页面初始化数据
- 异步接口数据

### 页面初始化数据
这类数据会随着页面模板一起加载，可以用来初始化页面数据，写入cookie，或者做页面重定向，
放在 `/data/page/xxx.js`

### 异步接口数据
这类数据通过AJAX请求加载，放在 `/data/api/xxx.js`

### 数据接口列表
| url         |  说明                   |
| :----------| :---------------------|
| /api/hotellist | 酒店列表            |
| /api/citysuggest | 城市suggest            |
| /api/keywordsuggest | 关键字suggest            |
| /api/citylist | 城市列表            |
| api/hotkeywords | 热词卡            |
| /api/hoteldetail | 酒店详情            |
| /api/hoteldevice | 城市设施            |
| /api/hotelprice | 房间报价            |
| /api/hotelimg | 酒店图片            |

##集成发布
QDR:
http://qdr.corp.qunar.com/job/unit_fe_nuomi

QCI:
http://qci.corp.qunar.com/job/unit_fe_nuomi

job参数：
界面上增加了2个可选参数：version（版本号，如1.0.1）和app（客户端宿主名称，如：nuomi）

版本号策略：
1. 发dev／beta不维护版本号，默认生成qunar-nuomi-1.0.1.zip
1. 发prd时，优先使用界面中的version参数，如果不输入version，版本号会自动在上次编译版本号上+1
