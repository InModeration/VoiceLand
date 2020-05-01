// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, comment_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  var $ = db.command.aggregate;
  return await db.collection('comment').aggregate()
    .match({
      _id: comment_id
    })
    .lookup({
      from: "user",
      localField: "main_user_id",
      foreignField: "_id",
      as: "main_user"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$main_user', 0]), '$$ROOT'])
    })
    .project({
      _id: 1,
      content: 1,
      like_num: 1,
      main_user_id: 1,
      time: 1,
      topic_id: 1,
      name: 1,
      avatar: 1
    })
    .end({
      success:res=>{
        return res;
      },
      fail: err=>{
        return err;
      }
    })
}