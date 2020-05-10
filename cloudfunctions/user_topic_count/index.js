/**
 * 本云函数用于获取用户发表的所有topic的数量用于显示
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'voice-land-qcrwm'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id} = event;
  const db = cloud.database();

  return await db.collection('topic').where({
    mainuser_id: user_id
  }).count()

}
