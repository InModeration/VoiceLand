// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'voice-land-qcrwm'
})

const db = cloud.database()
exports.main = async (event, context) => {
  let { userInfo, topic_id} = event;

  const res = await cloud.callFunction({
    name: 'topic_comment_user',
    data: {
      user_id: undefined,
      topic_id: topic_id
    }
  })
  var comments = res.result.list

  for (var i=0; i < comments.length; i++){
    cloud.callFunction({
      name: 'remove_comment',
      data: {
        comment_id: comments[i]._id
      }
    })
  }

  try {
    return await db.collection('topic').where({
      _id: topic_id
    }).remove()
  } catch(e) {
    console.error(e)
  }
}