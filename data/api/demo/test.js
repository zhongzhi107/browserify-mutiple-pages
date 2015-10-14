'use strict';

import {random} from 'lodash';
import url from 'url';
import querystring from 'querystring';

const nameList = [
  '北京京仪大酒店',
  '99旅馆连锁北京南锣鼓巷地铁站店',
  '北京京仪<i>大酒店</i>',
  '北京悦宏国际酒店',
  '北京即家轻奢酒店大郊亭店'
];

export default (req, res) => {
  let query = querystring.parse(url.parse(req.url).query);
  let limit = query.limit || 5;
  let data = { list: [] };

  for (var i = 0; i < limit; i++) {
    data.list.push({
      id: random(1000, 9999),
      name: nameList[random(0, 4)],
      address: '北京市海淀区大钟寺东路9号',
      image: 'http://lorempixel.com/120/120/',
      star: '高档',
      price: random(80, 800)
    });
  }

  //res.setHeader('Content-Type', 'text/html');
  res.end(JSON.stringify(data));
};
