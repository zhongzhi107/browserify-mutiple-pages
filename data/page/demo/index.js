/**
* @fileOverview test data for veloctiy template when the template load.
* @parameter _GET {JSON} data get from url query
* @return {JSON}
*/

'use strict';

export default (req, res) => {
  // var url = require('url');
  // var querystring = require('querystring');
  // var query = querystring.parse(url.parse(req.url).query);
  //


  // 为页面设置cookie
  res.setHeader('Set-Cookie', [
    '_q=1',
    '_t=1'
  ]);

  return {
    name: 'Joe'//,
    //name: query.name || 'Joe'
  };
};
