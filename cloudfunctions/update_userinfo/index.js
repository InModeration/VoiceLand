// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  let { userInfo, user_id, data} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  const _ = db.command
  exports.main = async (event, context) => {
    try {
      return await db.collection('user').doc(user_id)
      .update({
        data: data,
      })
    } catch(e) {
      console.error(e)
    }
  }
}