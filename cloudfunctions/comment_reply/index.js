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
  return await db.collection('reply').aggregate()
    .match({
      comment_id: comment_id
    })
    .sort({
      time: 1
    })
    .project({
      reply_id: '$_id',
      comment_id: 1,
      reply: {
        content: '$content',
        like_num: '$like_num',
        time: '$time'
      },
      repliee_id: 1,
      replier_id: 1
    })
    .lookup({
          from: "user",
          localField: "replier_id",
          foreignField: "_id",
          as: "replier"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$replier', 0]), '$$ROOT'])
    })
    .project({
      reply: 1,
      comment_id: 1,
      reply: 1,
      repliee_id: 1,
      replier_id: 1,
      replier: '$name',
      replier_avatar: '$avatar'
    })
    .lookup({
      from: "user",
      localField: "repliee_id",
      foreignField: "_id",
      as: "repliee"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$repliee', 0]), '$$ROOT'])
    })
    .project({
      reply: 1,
      comment_id: 1,
      reply: 1,
      repliee_id: 1,
      replier_id: 1,
      replier: 1,
      replier_avatar: 1,
      repliee: '$name',
      repliee_avatar: '$avatar'
    })
    .replaceRoot({
      newRoot: $.mergeObjects(['$reply', '$$ROOT'])
    })
    .project({
      reply: 0
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