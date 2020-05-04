// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, open_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  return await db.collection('user')
  .where({
    open_id: open_id
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