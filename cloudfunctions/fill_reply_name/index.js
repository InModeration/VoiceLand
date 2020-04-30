// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, comments} = event;
  let names = [];

  const db = cloud.database({
    env:'voice-land-qcrwm'
  });
  var $ = db.command.aggregate;

  for (var i=0; i < comments.length; i++){
    for (var j=0; j < comments[i].replies.length; j++){
      await db.collection('user').where({
        _id: comments[i].replies[j].replier_id
      }).get({
        success: res=>{
          // comments[i].replies[j].replier = res.result.list[0].name;
          names.push(res.result.list[0].name)
        },
        fail: err=>{
          console.log('Error!');
          console.log(err);
        }
      })

      await db.collection('user').where({
        _id: comments[i].replies[j].repliee_id
      }).get({
        success: res=>{
          // comments[i].replies[j].repliee = res.result.list[0].name;
          names.push(res.result.list[0].name)
        },
        fail: err=>{
          console.log('Error!');
          console.log(err);
        }
      })
    }
  }

  return {
    comments: names
  }
}