// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  let { userInfo, topic_id, replier_id, content} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  try {
    return await db.collection('comment').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        main_user_id: replier_id,
        content: content,
        topic_id: topic_id,
        like_num: 0,
        time: new Date()
      }
    })
  } catch(e) {
    console.error(e);
  }
}