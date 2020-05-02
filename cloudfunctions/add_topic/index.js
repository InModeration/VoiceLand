/**
 * 本云函数用于新增一个话题(动态)
 */


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  let { userInfo, data} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  try {
    return await db.collection('topic').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        mainuser_id: data.mainuser_id,
        content: data.content,
        pictures: data.pictures,
        like_num: 0,
        time: new Date()
      }
    })
  } catch(e) {
    console.error(e);
  }
}