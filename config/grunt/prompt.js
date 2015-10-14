'use strict';

import os from 'os';

var interfaces = os.networkInterfaces();

export default {
  ip: {
    options: {
      questions: [
        {
          config: 'connect.options.hostname', // arbitrary name or config for any other grunt task
          type: 'list', // list, checkbox, confirm, input, password
          message: 'Choose an IP from a list, returns the value: ',
          choices: () => {
            let ipList = ['localhost'];

            Object.keys(interfaces).forEach((key) => {
              interfaces[key].forEach((item) => {
                if (item.family === 'IPv4' && item.internal === false) {
                  // 根据qili的经验，在Qunar内部，如果ip第三段大于200，很有可能是无线网
                  let isWireless = item.address.split('.')[2] >= 200 || false;
                  ipList[isWireless ? 'unshift' : 'push']({
                    name: item.address
                  });
                }
              });
            });

            return ipList;
          }
        }
      ]
    }
  }
};
