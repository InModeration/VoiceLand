// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  let { userInfo, user_id, today} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  var $ = db.command.aggregate;

  return await db.collection('user').aggregate()
    .match({
      _id: user_id
    })
    .project({
      joinTime: $.dateFromString({
        dateString: "$joinTime"
      }),
      today: $.dateFromString({
        dateString: today
      }),
    })
    .project({
      joinday: $.subtract(['$today', '$joinTime'])
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