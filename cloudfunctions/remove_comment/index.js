// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'voice-land-qcrwm'
})

const db = cloud.database()
exports.main = async (event, context) => {
  let { userInfo, comment_id} = event;

  const res = await cloud.callFunction({
    name: 'comment_reply',
    data: {
      user_id: undefined,
      comment_id: comment_id
    }
  })
  var replies = res.result.list

  for (var i=0; i < replies.length; i++){
    cloud.callFunction({
      // 要调用的云函数名称
      name: 'remove_reply',
      // 传递给云函数的参数
      data: {
        reply_id: replies[i]._id
      }
    })
  }

  try {
    return await db.collection('comment').where({
      _id: comment_id
    }).remove()
  } catch(e) {
    console.error(e)
  }
}