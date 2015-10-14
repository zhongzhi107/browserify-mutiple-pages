/**
 * 该文件封装了和数学相关的函数
 */

'use strict';


export default {
  /**
   * Return an integer between min and max.
   *
   * @param {Integer} min 范围下限
   * @param {Integer} max 范围上限
   * @return {Integer}
   */
  random: (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
};
