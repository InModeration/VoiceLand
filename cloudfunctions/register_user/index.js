// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, open_id, name} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  try {
    return await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        age: '保密',
        avatar: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/default_avatar.jpg?sign=11d0ca410eb95707aaf2cf79b447877e&t=1588583818',
        cover: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/background/default/default-1.jpg?sign=29a34a3a1195ce88a75b716d0787fc57&t=1587992126',
        interest: [],
        concern: [],
        joinTime: new Date(),
        motto: '',
        name: name,
        open_id: open_id,
        password: '',
        region: '保密',
        sex: '保密'
      }
    })
  } catch(e) {
    console.error(e);
  }
}