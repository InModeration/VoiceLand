module.exports = {}

var user_url = "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/data/user.json?sign=f2e1e2f700847227800187fd39c0d6a4&t=1588147629";

function loadJson(json_url, page) {
      wx.request({
            url: json_url, //json数据地址
            headers: {
                  'Content-Type': 'application/json'
            },
            success: function(res) {
                  //将获取到的json数据，存在名字叫list_data的这个数组中
                  page.setData({
                        list_data: res.data.imgListData,
                        //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
                  })
            },
            fail: res => {
                  console.log(res);
            }
      });
}

function addComment(topic_id, replier_id, content, callback) {
      var call = callback
      wx.cloud.callFunction({
            name: 'add_comment',
            data: {
                  topic_id: topic_id,
                  replier_id: replier_id,
                  content: content
            },
            success: res => {
                  console.log(res);
                  call()
                  wx.showToast({
                        title: '发送成功！',
                  })
            },
            fail: err => {
                  console.log(err);
                  call()
                  wx.showToast({
                        title: err,
                  })
            }
      });
}

function updateInfo(user_id, age, avatar, cover, interest, motto, name, region, sex, callback) {
      // var data = {
      //       age: age,
      //       avatar: avatar,
      //       cover: cover,
      //       interest: interest,
      //       motto: motto,
      //       name: name,
      //       region: region,
      //       sex: sex
      // };

      // console.log('user_id: ' + user_id);

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

      var cb = callback;
      const db = wx.cloud.database();

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
            // console.log('成功更新!');
            // console.log(res);
            cb('保存成功!');
      }).catch(err => {
            // console.log(err);
            cb('保存失败!');
      });
}

function addReply(comment_id, replier_id, repliee_id, content, callback) {
      var data = {
            comment_id: comment_id,
            repliee_id: repliee_id,
            replier_id: replier_id,
            content: content
      };
      var call = callback

      // console.log(data);
      wx.cloud.callFunction({
            name: 'add_reply',
            data: data,
            success: res => {
                  console.log(res)
                  call()
                  wx.showToast({
                        title: '发送成功！',
                  })
            },
            fail: err => {
                  console.log(err);
                  call()
                  wx.showToast({
                        title: err,
                        icon: 'none'
                  })
            }
      });
}

/* 
  调用云函数增加一条topic记录
  增加回调函数
*/
function addTopic(user_id, content, pictures, callback) {
      var data = {
            mainuser_id: user_id,
            content: content,
            pictures: pictures
      };

      var call = callback;

      wx.cloud.callFunction({
            name: "add_topic",
            data: {
                  data: data
            },
            success: res => {
                  console.log(res);
                  call();
                  return 1;
                  // callback here
            },
            fail: err => {
                  console.log(err);
                  return 0;
            }
      });
}

function addTopicLike(topic_id, user_id, callback) {
      const db = wx.cloud.database();
      var cb = callback;

      const _ = db.command
      db.collection('topic').doc(topic_id).update({
            data: {
                  likes: _.addToSet(user_id)
            }
      }).then(res => {
            cb();
            // console.log('成功更新!');
            // console.log(res);
      }).catch(err => {
            console.log(err);
      });
}

function addCommentLike(comment_id, user_id, callback) {
      const db = wx.cloud.database();
      var cb = callback;

      const _ = db.command
      db.collection('comment').doc(comment_id).update({
            data: {
                  likes: _.addToSet(user_id)
            }
      }).then(res => {
            // console.log('成功更新!');
            // console.log(res);
            cb();
      }).catch(err => {
            console.log(err);
            // cb('保存失败');
      });
}

function addReplyLike(reply_id, user_id, callback) {
      var cb = callback;
      const db = wx.cloud.database();

      const _ = db.command
      db.collection('reply').doc(reply_id).update({
            data: {
                  likes: _.addToSet(user_id)
            }
      }).then(res => {
            // console.log('成功更新!');
            // console.log(res);
            cb();
      }).catch(err => {
            console.log(err);
      });
}

function updateAvatar(user_id, avatar) {
      const db = wx.cloud.database();
      const _ = db.command;

      db.collection('user').doc(user_id).update({
            data: {
                  avatar: avatar
            }
      }).then(res => {
            console.log('成功更新!');
            console.log(res);
      }).catch(err => {
            console.log(err);
      });
}

function updateCover(user_id, cover) {
      const db = wx.cloud.database();
      const _ = db.command;

      db.collection('user').doc(user_id).update({
            data: {
                  cover: cover
            }
      }).then(res => {
            console.log('成功更新!');
            console.log(res);
      }).catch(err => {
            console.log(err);
      });
}

function addConcern(user_id, my_user_id, callback) {
      var cb = callback;
      const db = wx.cloud.database();

      const _ = db.command
      db.collection('user').doc(my_user_id).update({
            data: {
                  concern: _.addToSet(user_id)
            }
      }).then(res => {
            // console.log('成功更新!');
            console.log(res);
            cb();
      }).catch(err => {
            console.log(err);
      });
}

function removeConcern(user_id, my_user_id, callback) {
      var cb = callback;
      const db = wx.cloud.database();

      const _ = db.command
      db.collection('user').doc(my_user_id).update({
            data: {
                  concern: _.pull(user_id)
            }
      }).then(res => {
            // console.log('成功更新!');
            console.log(res);
            cb();
      }).catch(err => {
            console.log(err);
      });
}

module.exports.addComment = addComment;
module.exports.updateInfo = updateInfo;
module.exports.addReply = addReply;
module.exports.addTopic = addTopic;
module.exports.updateAvatar = updateAvatar;
module.exports.updateCover = updateCover;
module.exports.addTopicLike = addTopicLike;
module.exports.addCommentLike = addCommentLike;
module.exports.addReplyLike = addReplyLike;
module.exports.addConcern = addConcern;
module.exports.removeConcern = removeConcern;