// 引入fetch 
// const fetch = require('node-fetch');
// const fs = require('fs');
// const path = require('path');
// const jsonPath = path.resolve(__dirname, './test.json');
// const mockData = fs.readFileSync(jsonPath, 'utf-8');

const reqUrlPath = 'https://hja1fe.top/api/topic/node/topics?page=1&userId=24123619&type=1'

const reqUrl = async () => {
    const res = await fetch(reqUrlPath, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        "pcver": "2",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://hja1fe.top/homepage/last/24123619",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });
  
    const isString = (data) => Object.prototype.toString.call(data) === "[object String]";
    const isObject = (data) => Object.prototype.toString.call(data) === "[object Object]";
    
    const decodeEncryptString = (text) => {
      const isStringData = isString(text);
      let data = text;
      try {
        if (isStringData) {
  
          const tmpDataObj = JSON.parse(text);
          const isBareObjectData = isObject(tmpDataObj == null ? void 0 : tmpDataObj.data);
          const isBareStringData = isString(tmpDataObj == null ? void 0 : tmpDataObj.data);
          if (isBareObjectData) {
            data = tmpDataObj == null ? void 0 : tmpDataObj.data;
          } else if (isBareStringData) {
            data = bareDecode(tmpDataObj == null ? void 0 : tmpDataObj.data);
          }
        }
  } catch (error) {
    console.log('error', error);
      }
      return data;
    };
   
    const bareDecode = (text) => {
      return JSON.parse(atob(atob(atob(text))));
    };
  

    
    const data = await res.text();
    console.log('data', data);
    const data2 = decodeEncryptString(data)
    console.log('data2', data2);
    return data2;
  }


const checkUpdate =  (mockData) => {
    const mockData2 = JSON.parse(mockData);

    // 拿出第一个
    const result = mockData2.results[0];
    console.log('result', result);
    const createTime= new Date(result.createTime).getTime();
    //当前时间对比
    const now = new Date().getTime();
    // 如果小于一个小时
    const anHour = 60 * 60 * 1000; // 一个
    if(now - createTime < anHour) {
        console.log('更新小于一个小时');
      console.log('result', result);
      return true
    //   通知
    }else{
        console.log('更新大于一个小时');
        return false
    }
    
}


const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async () => {
  await notify(await glados())
}

main()
