module.exports = {}

function addComment(topic_id, replier_id, content){
  wx.cloud.callFunction({
    name: 'add_comment',
    data: {
      topic_id: topic_id,
      replier_id: replier_id, 
      content: content
    },
    success: res=>{
      console.log(res);
    },
    fail: err=>{
      console.log(err);
    }
  });
}

function updateInfo(user_id, age, avatar, cover, interest, motto, name, region, sex){
  var data = {
    age: age,
    avatar: avatar,
    cover: cover,
    interest: interest,
    motto: motto,
    name: name,
    region: region,
    sex: sex
  };

  console.log('user_id: ' + user_id);

  // wx.cloud.callFunction({
  //   name: 'update_userinfo',
  //   data: {
  //     user_id: user_id,
  //     data: data
  //   },
  //   success: res=>{
  //     console.log('成功更新数据!');
  //     console.log(res);
  //   },
  //   fail: err=>{
  //     console.log(err);
  //   }
  // });

  const db = wx.cloud.database();

  db.collection('user').doc(user_id).get({
    complete: console.log
  });

  db.collection('user').doc(user_id).update({
    data: {
      age: age,
      avatar: avatar,
      cover: cover,
      interest: interest,
      motto: motto,
      name: name,
      region: region,
      sex: sex
    }
  }).then(res => {
    console.log('成功更新!');
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

function addReply(comment_id, replier_id, repliee_id, content){
  wx.cloud.callFunction({
    name: 'add_reply',
    data: {
      comment_id: comment_id,
      repliee_id: repliee_id,
      replier_id: replier_id,
      content: content
    },
    success: res=>{
      console.log(res)
    },
    fail: err=>{
      console.log(err);
    }
  });
}

module.exports.addComment = addComment;
module.exports.updateInfo = updateInfo;
module.exports.addReply = addReply;