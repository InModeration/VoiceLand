/**
 * 本云函数用于新增一条评论comment的回复reply，需要
 * 提供回复者和被回复者
 */


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  let { userInfo, comment_id, replier_id, repliee_id, content} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  try {
    return await db.collection('reply').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        comment_id: comment_id,
        repliee_id: repliee_id,
        replier_id: replier_id,
        content: content,
        like_num: 0,
        time: new Date()
      }
    })
  } catch(e) {
    console.error(e);
  }
}