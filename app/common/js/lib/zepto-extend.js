/**
 * @date   : 15-7-20
 * @author : 王文清(wenqing.wang)
 * @link   : touch.qunar.com
 * @desc   :
 */
(function ($) {
  var log = console.log || function () {
    };
  //组件插件化
  $.pluginize = function (name, Module) {
    if ($.fn[name]) {
      log("已存在同名插件，请确认后再次尝试");
      return;
    }
    $.fn[name] = function (options) {
      options = options || {};
      var arg = [].splice.call(arguments, 1),
        ret;
      //插件主体
      this.each(function () {
        var $me = $(this),
          module = $me.data(name);
        if (module) {
          if (typeof options === "string") {
            ret = module[options].apply(module, arg);
          }
          return;
        }
        if (typeof options === "object") {
          //将实例化后的插件缓存在dom结构里
          module = new Module(this, options);
          $me.data(name, module);
          return;
        }
        log('插件尚未实例化，请先实例化后再行调用');
      });
      return !ret ? this : ret;
    }
  };

  //组件模块化
  $.modularize = function (m) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
      if (define.amd) {
        // AMD 规范，for：requirejs
        define(function () {
          return m;
        });
      } else if (define.cmd) {
        // CMD 规范，for：seajs
        define(function (require, exports, module) {
          module.exports = m;
        });
      } else if (module) {
        module.exports = m;
      }
    }
  };
  //组件插件且模块化
  $.pluginModularize = function (name, Module) {
    $.pluginize(name, Module);
    $.modularize(Module);
  };


  $.throttle = function (delay, fn, debounce_mode) {
    var last = 0,
      timeId;

    if (typeof fn !== 'function') {
      debounce_mode = fn;
      fn = delay;
      delay = 250;
    }

    function wrapper() {
      var that = this,
        period = Date.now() - last,
        args = arguments;

      function exec() {
        last = Date.now();
        fn.apply(that, args);
      }

      function clear() {
        timeId = undefined;
      }

      if (debounce_mode && !timeId) {
        // debounce模式 && 第一次调用
        exec();
      }

      timeId && clearTimeout(timeId);
      if (debounce_mode === undefined && period > delay) {
        // throttle, 执行到了delay时间
        exec();
      } else {
        // debounce, 如果是start就clearTimeout
        timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay);
      }
    }

    // for event bind | unbind
    wrapper._zid = fn._zid = fn._zid || $.proxy(fn)._zid;
    return wrapper;
  };

  $.debounce = function (delay, fn, t) {
    return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t === undefined ? false : t !== false);
  };

  $.href = function () {
    var value = window.location.href,
      re = new RegExp(),
      result;
    value = value.replace(/#.*/, '');
    return {
      getValue: function () {
        return value;
      },
      replace: function () {
        value = value.replace(arguments[0], arguments[1])
        return this;
      },
      append: function (paramString) {
        value = value + "&" + paramString;
        return this;
      },
      path: function (path) {
        value = value.indexOf('?') != -1 ? value.replace(/\/[^\/]*\?/, '/' + path + '?') : value.replace(/\/[^/]*$/, '/' + path + '?');
        return this;
      },
      param: function () {			//接收已知参数名
        var argu = arguments,
          len = argu.length;
        if (len == 0) {
          //消除所有参数
          value = value.replace(/\?(.)*/, '?');
          return this;
        }
        if (len == 1 && typeof argu[0] == 'string') {
          re.compile('[&?]' + argu[0] + '=([^=&?#]*)');
          return value.match(re) ? value.match(re)[1] : '';

        }
        if (len == 2) {
          re.compile('[&?]' + argu[0] + '=([^=&?#]*)');
          result = value.match(re);
          value = result ? value.replace(argu[0] + '=' + result[1], argu[0] + '=' + argu[1])
            : (value + (value.indexOf('?') == -1 ? '?' : (value.indexOf('?') == value.length - 1 ? '' : '&')) + argu[0] + '=' + argu[1]);
          return this;
        }
        if (typeof argu[0] == 'object') {
          var i, obj = argu[0];
          for (i in obj) {
            argu.callee(i, obj[i]);
          }
        }
        return this;
      },
      exec: function () {
        window.location.href = value;
      }
    }
  };
  $.getDateString = function (date, showHms) {
    date = dateToJson(date);
    return date.y + '-' + fixZero(date.m) + '-' + fixZero(date.d) + (!showHms ? '' : ' ' + fixZero(date.hh) + ':' + fixZero(date.mm) + ':' + fixZero(date.ss) + ' ' + date.mmss);
    function fixZero(int) {
      return int < 10 ? '0' + int : int;
    }
    function dateToJson (date) {
      return {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        mmss: date.getMilliseconds()
      }
    }
  },

  $.extend($.fn, {
    lazyload: function(i) {
      var win = window,
          pro = Array.prototype,
          slice = pro.slice,
          splice = pro.splice,
          lazyList = slice.call(this, 0).reverse(),
          OFFSET = {
            win: ['scrollY', 'innerHeight', 'pageYOffset'],
            img: ['top', 'height']
          };

      //当设备转动或者滚动时检测视口并加载
      $(win).on('ortchange scrollStop resize load', function () {
        checkViewAndLoad(lazyList);
      });
      checkViewAndLoad(lazyList);

      //开始加载
      function startLoad(img) {
        var zImg = $(img),
            zTmpImg = $('<img style="display: none" />');
        zTmpImg.on('load',function () {
          zImg.replaceWith(zTmpImg);
          zTmpImg.fadeIn();
          zTmpImg.off('load');
        }).attr('src', zImg.attr("lazy_src"));
      }

      //检测图片是否出现在可视区，并对满足条件的开始加载
      function checkViewAndLoad(imgList) {
        for (var i = imgList.length; i--;) {
          var img = imgList[i],
              offset = $(img).offset();
          if (inViewport(offset)) {
            splice.call(imgList, i, 1);
            startLoad(img);
          }
        }
      }

      //检测图片是否出现在视区之内
      function inViewport(offset) {
        var viewTop = win[OFFSET.win[0]] || win[OFFSET.win[2]],
            viewHeight = win[OFFSET.win[1]];
        return viewTop >= offset[OFFSET.img[0]] - viewHeight && viewTop <= offset[OFFSET.img[0]] + offset[OFFSET.img[1]];
      }

      return this;
    }
  });
  //模块化
  $.modularize($);

  $(window).on('scroll', $.debounce(80, function () {
    $(document).trigger('scrollStop');
  }, false));

})(Zepto);


