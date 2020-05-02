/**
 * 本云函数用于根据提供的用户id，返回用户的一切信息(包括密码)
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

  return await db.collection('user').where({
    _id: user_id
  }).get({
    success: res=>{
      return res;
    },
    fail: err=>{
      return err;
    }
  })
}