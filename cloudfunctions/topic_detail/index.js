/**
 * 本云函数用于根据提供的topic id，返回话题对应的内容和
 * 发表话题的用户的姓名和头像信息
 */


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  let { userInfo, topic_id} = event;

  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  var $ = db.command.aggregate;
  return await db.collection('topic').aggregate()
    .match({
      _id: topic_id
    })
    .lookup({
          from: "user",
          localField: "mainuser_id",
          foreignField: "_id",
          as: "mainuser"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$mainuser', 0]), '$$ROOT' ])
    })
    .project({
      avatar: true,
      name: true,
      comment_num: true,
      topic_content: '$content',
      like_num: true,
      mainuser_id: true,
      topic_time: '$time',
      pictures: true,
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