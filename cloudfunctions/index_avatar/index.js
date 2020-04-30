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
          from: "avatar",
          localField: "mainuser_id",
          foreignField: "user",
          as: "avatarpath"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$avatarpath', 0]), '$$ROOT' ])
    })
    .project({
      avatarpath: 0
    })
    .end({
      success:res=>{
        return res;
      },
      fail: err=>{
        return err;
      }
    })
  // return {
  //   msg: "云函数调用成功！"
  // }
}

// db.collection('topic').aggregate()
//     .lookup({
//           from: "avatar",
//           localField: "mainuser_id",
//           foreignField: "user"
//     })
//     .end()
//     .then(res=>{
//           that.setData({
//                 feed: res.data,
//                 feed_length: res.data.length
//           })
//     })
//     .catch(err=>console.log(err))