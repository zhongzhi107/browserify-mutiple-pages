'use strict';

// module.exports = {
export default {
  icon: {
    src: [
      '<%=yo.app%>/common/images/icon/*.png',
      '!<%=yo.app%>/common/images/**/sprite.png'
    ],
    dest: '<%=yo.app%>/common/images/icon/sprite.png',
    destCss: '<%=yo.app%>/common/css/icon.less',
    imgPath: '/common/images/icon/sprite.png',
    cssFormat: 'less'
  },
  'repeat-x': {
    src: [
      '<%=yo.app%>/common/images/repeat-x/*.png',
      '!<%=yo.app%>/common/images/**/sprite.png'
    ],
    dest: '<%=yo.app%>/common/images/repeat-x/sprite.png',
    destCss: '<%=yo.app%>/common/css/repeat-x.less',
    imgPath: '/common/images/repeat-x/sprite.png',
    cssFormat: 'less',
    algorithm: 'top-down'
  },
  'repeat-y': {
    src: [
      '<%=yo.app%>/common/images/repeat-y/*.png',
      '!<%=yo.app%>/common/images/**/sprite.png'
    ],
    dest: '<%=yo.app%>/common/images/repeat-y/sprite.png',
    destCss: '<%=yo.app%>/common/css/repeat-y.less',
    imgPath: '/common/images/repeat-y/sprite.png',
    cssFormat: 'less',
    algorithm: 'left-right'
  }
};
