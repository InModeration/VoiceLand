// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id} = event;
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
      mainuser_id: true,
      name: true,
      pictures: true,
      _id: true
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