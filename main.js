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


    const data =  await res.text();
    const data2 = decodeEncryptString(data)
    return data2;
  }

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

const checkUpdate =  (mockData) => {
    const mockData2 = mockData

    // 拿出第一个
    const result = mockData2.results[0];

    console.log('createTimeStr', result.createTime);
    const createTime= new Date(result.createTime).getTime();
    //当前时间对比
    const now = getCurrent().getTime();
    const nowStr = getCurrent().toLocaleString();
   console.log('nowStr', nowStr)
    // 如果小于一个小时

  const towHour = 60 * 63 * 2 * 1000; // 两个小时
  console.log('towHour', towHour)
  console.log('createTime now now - createTime', createTime,now,now - createTime)
  const stand = now - createTime < towHour
  console.log('stand', stand)
  if(stand) {
        console.log('更新小于一个小时');
      return {
        createTime,
        nowStr,
        stand,
      }
    }else{
        console.log('更新大于一个小时');
      return {
        createTime,
        nowStr,
        stand,
      };
    }

}

const getCurrent  = () => {
  const date = new Date();
  const chinaTime = date.toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
  return new Date(chinaTime);
}
const notify = async (contents) => {
  const token = process.env.NOTIFY
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents[1],
      template: 'markdown',
    }),
  }).then((res)=>{
    console.log('res', res.text());
  }).finally(() => {
    console.log('通知成功');
  })
}

const main = async () => {
  const listData =  await reqUrl();

  const { createTime ,nowStr,stand} = checkUpdate(listData)

  const test = false
  if(test || stand) {
     await notify(['更新了小沫', `更新时间 ${createTime} 当前时间 ${nowStr}`])

  }
}
main()
