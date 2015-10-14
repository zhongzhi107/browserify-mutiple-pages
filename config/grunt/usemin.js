'use strict';

import appConfig from '../app';

export default (qdrConfig) => {

  let cdnRoot = appConfig.cdnDomain[process.env.DEPLOY_TYPE];
  if (qdrConfig.app === 'nuomi') {
    cdnRoot = '';
  }

  // usemin支持传入前置/后置函数，处理匹配中的文件名
  let filterIn = (m) => {
    return m;
  };
  
  let filterOut = (m) => {
    if (/^(?!http:\/\/|https:\/\/|data:|\/\/).+?\.(js|css|png|jpg|gif|svg|swf|ico)/i.test(m)) {
      m = cdnRoot + m;
    }
    return m;
  };

  return {
    // look under this files
    css: '<%=yo.dist%>/**/*.css',
    html: '<%=yo.dist%>/**/*.{html,js}', // 前端模版打包到了js，所以，js也需要执行一遍html替换
    js: '<%=yo.dist%>/**/*.js',
    options: {
      // Single item array set to the value of the directory where the currently looked at file is.
      assetsDirs: [
        '<%=yo.dist%>'
      ],
      // Extend default settings to support CDN url.
      patterns: {
        'html': [
          /*jshint regexp:false */
          [
            /<script.+src=['"]([^"']+)["']/gm,
            'Update the HTML to reference our concat/min/revved script files',
            filterIn,
            filterOut
          ],
          [
            /<link[^\>]+href=['"]([^"']+)["']/gm,
            'Update the HTML with the new css filenames',
            filterIn,
            filterOut
          ],
          [
            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
            'Update the HTML with the new img filenames',
            filterIn,
            filterOut
          ],
          [
            /<video[^\>]+src=['"]([^"']+)["']/gm,
            'Update the HTML with the new video filenames',
            filterIn,
            filterOut
          ],
          [
            /<video[^\>]+poster=['"]([^"']+)["']/gm,
            'Update the HTML with the new poster filenames',
            filterIn,
            filterOut
          ],
          [
            /<source[^\>]+src=['"]([^"']+)["']/gm,
            'Update the HTML with the new source filenames',
            filterIn,
            filterOut
          ],
          [
            /url\(\s*['"]([^"']+)["']\s*\)/gm,
            'Update the HTML with background imgs, case there is some inline style',
            filterIn,
            filterOut
          ],
          [
            /<a[^\>]+href=['"]([^"']+)["']/gm,
            'Update the HTML with anchors images',
            filterIn,
            filterOut
          ],
          [
            /<input[^\>]+src=['"]([^"']+)["']/gm,
            'Update the HTML with reference in input',
            filterIn,
            filterOut
          ],
          [
            /<meta[^\>]+content=['"]([^"']+)["']/gm,
            'Update the HTML with the new img filenames in meta tags',
            filterIn,
            filterOut
          ],
          [
            /<object[^\>]+data=['"]([^"']+)["']/gm,
            'Update the HTML with the new object filenames',
            filterIn,
            filterOut
          ],
          [
            /<image[^\>]*[^\>\S]+xlink:href=['"]([^"'#]+)(#.+)?["']/gm,
            'Update the HTML with the new image filenames for svg xlink:href links',
            filterIn,
            filterOut
          ],
          [
            /<image[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
            'Update the HTML with the new image filenames for src links',
            filterIn,
            filterOut
          ],
          [
            /<(?:img|source)[^\>]*[^\>\S]+srcset=['"]([^"'\s]+)\s*?(?:\s\d*?[w])?(?:\s\d*?[x])?\s*?["']/gm,
            'Update the HTML with the new image filenames for srcset links',
            filterIn,
            filterOut
          ],
          [
            /<(?:use|image)[^\>]*[^\>\S]+xlink:href=['"]([^'"\)#]+)(#.+)?["']/gm,
            'Update the HTML within the <use> tag when referencing an external url with svg sprites as in svg4everybody',
            filterIn,
            filterOut
          ]
        ],
        'css': [
          /*jshint regexp:false */
          [ /(?:src=|url\(\s*)['"]?([^'"\)]+)['"]?\s*\)?/gm,
            'Update the CSS to reference our revved images',
            filterIn,
            filterOut
          ]
        ]
      }
    }
  };
};
