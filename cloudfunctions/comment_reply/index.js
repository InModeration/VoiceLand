/*
  本云函数用于查询云数据库，根据提供的评论comment_id，返回对应的评论的所有回复，
  包括回复的id，回复的内容，回复的时间，回复人和被回复人，赞的数量等
*/

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
      reply: {                          // 将reply相关内容收集到一个reply对象中方便后续project时只用写一个 reply: 1
        content: '$content',
        like_num: $.size('$likes'),
        likes: '$likes',
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
    .replaceRoot({                                            // 展开reply中内容到根目录
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