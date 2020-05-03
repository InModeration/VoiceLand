/*
  本云函数用于查询云数据库，根据提供的评论comment_id，返回对应评论的完整内容，
  包括正文，评论人昵称，评论人头像，评论时间，赞的数量等
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
      likes: 1,
      like_num: $.size('$likes'),
      main_user_id: 1,
      time: $.dateToString({
        date: '$time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        timezone: "Asia/Shanghai"
      }),
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