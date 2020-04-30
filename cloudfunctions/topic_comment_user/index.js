// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, topic_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  var $ = db.command.aggregate;
  return await db.collection('comment').aggregate()
    .match({
      topic_id: topic_id
    })
    .project({
      comment_like_num: '$like_num',
      comment_time: '$time',
      comment_content: '$content',
      comment_id: '$_id',
      main_user_id: 1
    })
    .lookup({
      from: "reply",
      localField: "_id",
      foreignField: "comment_id",
      as: "replies"
    })
    .unwind({
      path: '$replies',
      preserveNullAndEmptyArrays: true
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ '$replies', '$$ROOT'])
    })
    .project({
      replies: 0
    })  // 查找repliee
    .lookup({
      from: "user",
      localField: "repliee_id",
      foreignField: "_id",
      as: "repliee"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$repliee', 0]), '$$ROOT' ])
    })
    .project({
      repliee: 0
    })
    .project({
      repliee: '$name',
      reply_content: '$content',
      comment_content: 1,
      comment_like_num: 1,
      comment_time: 1,
      main_user_id: 1,
      topic_id: 1,
      comment_id: 1,
      content: 1,
      like_num: 1,
      replier_id: 1,
      repliee_id: 1,
      sort_key: 1,
      time: 1
    })    // 查找replier
    .lookup({
      from: "user",
      localField: "replier_id",
      foreignField: "_id",
      as: "replier"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$replier', 0]), '$$ROOT' ])
    })
    .project({
      replier: 0
    })
    .project({
      replier: '$name',
      repliee: 1,
      comment_content: 1,
      comment_like_num: 1,
      comment_time: 1,
      main_user_id: 1,
      topic_id: 1,
      comment_id: 1,
      content: 1,
      like_num: 1,
      replier_id: 1,
      repliee_id: 1,
      sort_key: 1,
      time: 1
    })
    .lookup({
      from: "user",
      localField: "main_user_id",
      foreignField: "_id",
      as: "commenter"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$commenter', 0]), '$$ROOT' ])
    })
    .project({
      commenter: 0,
      age: 0,
      cover: 0,
      interest: 0,
      joinTime: 0,
      motto: 0,
      password: 0,
      region: 0,
      sex: 0
    })
    // .group({
    //   _id: {
    //     comment_id: '$comment_id',
    //     comment_like_num: '$comment_like_num',
    //     comment_time: '$comment_time',
    //     comment_content: "$comment_content",
    //   }
    // })
    .end({
      success:res=>{
        return res;
      },
      fail: err=>{
        return err;
      }
    })
  // return await db.collection('comment').aggregate()
  //   .lookup({
  //         from: "topic",
  //         localField: "topic_id",
  //         foreignField: "_id",
  //         as: "comment_topic"
  //   })
  //   .replaceRoot({
  //     newRoot: $.mergeObjects([ $.arrayElemAt(['$comment_topic', 0]), '$$ROOT' ])
  //   })
  //   .project({
  //     comment_topic: 0
  //   })
  //   .lookup({
  //     from: "user",
  //     localField: "mainuser_id",
  //     foreignField: "_id",
  //     as: "comment_topic_user"
  //   })
  //   .replaceRoot({
  //     newRoot: $.mergeObjects([ $.arrayElemAt(['$comment_topic_user', 0]), '$$ROOT' ])
  //   })
  //   .project({
  //     comment_topic_user: 0
  //   })
  //   .lookup({
  //     from: "reply",
  //     localField: "_id",
  //     foreignField: "comment_id",
  //     as: "replies"
  //   })
  //   .unwind({
  //     path: '$replies',
  //     preserveNullAndEmptyArrays: true
  //   })
  //   .end({
  //     success:res=>{
  //       return res;
  //     },
  //     fail: err=>{
  //       return err;
  //     }
  //   })
}