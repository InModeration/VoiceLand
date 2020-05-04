/*
  本云函数用于查询云数据库，随机获取部分数据库中存在的话题，内容包括
  话题发起者昵称和头像，话题内容，评论数和赞的数量。每次调用此函数应该
  使用随机采样的方式获取到不同的内容
*/

//TODO: 一次性的数量返回限制和随机采样

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id, topic_limit} = event;
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  var $ = db.command.aggregate;

  return await db.collection('topic').aggregate()
    .lookup({
      from: "comment",
      localField: "_id",
      foreignField: "topic_id",
      as: "comments"
    })
    .project({
      comment_num: $.size('$comments'),
      content: 1,
      mainuser_id: 1,
      time: $.dateToString({
        date: '$time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        timezone: "Asia/Shanghai"
      }),
      like_num: $.size('$likes'),
      likes: 1,
      pictures: 1,
      like_url: user_id
    })
    .sample({
      size: topic_limit
    })
    .lookup({
          from: "user",
          localField: "mainuser_id",
          foreignField: "_id",
          as: "userinfo"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$userinfo', 0]), '$$ROOT' ])
    })
    .project({
      avatar: true,
      comment_num: true,
      content: true,
      like_num: true,
      likes: true,
      mainuser_id: true,
      name: true,
      pictures: true,
      time: true,
      _id: true,
      liked: $.in([user_id, '$likes'])
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