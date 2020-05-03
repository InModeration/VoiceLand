/*
  本云函数用于查询云数据库，根据提供的话题topic_id，将话题所有相关信息
  收集并返回，包括：评论内容，评论者姓名和头像，评论下方的回复以及回复
  者和被回复者的昵称，评论相关的回复会收集到对应评论下的replies数组中
*/

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var NOT_EXIST_TAG = '__NOTEXIST__';

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
      comment_likes: '$likes',
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
      comment_likes: 1,
      comment_time: 1,
      main_user_id: 1,
      topic_id: 1,
      comment_id: 1,
      content: 1,
      likes: 1,
      replier_id: 1,
      repliee_id: 1,
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
      comment_likes: 1,
      comment_time: 1,
      main_user_id: 1,
      topic_id: 1,
      comment_id: 1,
      content: 1,
      likes: 1,
      replier_id: 1,
      repliee_id: 1,
      time: $.ifNull(['$time', NOT_EXIST_TAG]),
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
    .sort({           // 第一次排序按照回复时间排序，此时回复还没有合并，相当于回复内部进行了一次排序
      time: 1
    })
    .group({
      _id:{
        comment_id: '$comment_id',
        comment_time: '$comment_time',
        comment_content: "$comment_content",
        main_user_id: '$main_user_id',
        topic_id: '$topic_id',
        name: '$name',
        avatar: '$avatar',
        comment_likes: '$comment_likes'
      },
      replies: $.push({
        replier: '$replier',
        replier_id: '$replier_id',
        repliee: '$repliee',
        repliee_id: '$repliee_id',
        sort_key: '$sort_key',
        content: '$content',
        likes: '$likes',
        time: '$time'
      })
    })
    .project({
      replies: $.filter({
        input: '$replies',
        as: 'item',
        cond: $.neq(['$$item.time', NOT_EXIST_TAG])       //将没有回复的评论的replies内部的空对象移除
      })
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ '$_id', '$$ROOT' ])
    })
    .project({
      _id: 0
    })
    .project({
      comment_like_num: $.size('$comment_likes'),
      comment_id: 1,
      comment_time: 1,
      comment_content: 1,
      main_user_id: 1,
      topic_id: 1,
      name: 1,
      avatar: 1,
      comment_likes: 1,
      replies: 1
    })
    .sort({
      comment_time: 1             // 第二次排序按照评论时间排序，此时回复已经合并，由于第一次排序已经保证了回复的顺序，因此本次排序只排评论
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