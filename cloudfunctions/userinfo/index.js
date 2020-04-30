// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  return await db.collection('topic').where({
    _id: user_id
  }).field({
    avatar: true,
    name: true
  }).get({
    success: res=>{
      return res;
    },
    fail: err=>{
      return err;
    }
  })
}