/**
 * 本云函数用于获取用户发表的所有topic，用在personal页面
 */


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  const $ = db.command.aggregate;

  return await db.collection('topic').aggregate()
  .match({
    mainuser_id: user_id
  })
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
    time: 1,
    like_num: 1,
    pictures: 1
  })
  .sort({
    time: -1
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
