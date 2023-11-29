const createTime = new Date('2023-11-28 17:18:16')
const now = new Date()
const nowStr = new Date().toLocaleString();
console.log('nowStr', nowStr);

const anHour = 60 * 63 * 2 * 1000; // 两个小时
const stand = now - createTime < anHour
console.log('stand', stand);
if (now - createTime < anHour) {
  console.log('更新小于一个小时');
}
