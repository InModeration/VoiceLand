/**
 * 本函数用于查找云数据库中谁关心我，并获取这些人的资料信息
 * 用于显示
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
  const _ = db.command;

  return await db.collection('user')
  .where({
    concern: _.elemMatch(_.eq(user_id))
  })
  .get({
    success: res=>{
      return res;
    },
    fail: err=>{
      return err;
    }
  })
}