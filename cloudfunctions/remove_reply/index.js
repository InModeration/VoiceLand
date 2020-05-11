// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'voice-land-qcrwm'
})

const db = cloud.database()
exports.main = async (event, context) => {
  let { userInfo, reply_id} = event;

  try {
    return await db.collection('reply').where({
      _id: reply_id
    }).remove()
  } catch(e) {
    console.error(e)
  }
  
}