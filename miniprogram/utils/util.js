function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
var topic_detail = require('../data/data_topic_detail.js')
var comment_detail = require('../data/data_comment_detail.js')
var user_info = require('../data/data_user_info.js')

function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}

function topicDetail(){
  return topic
}

function getTopicDetail(){
  return topic_detail.topic_detail;
}

function getCommentDetail(){
  return comment_detail.comment_detail;
}

function getUserInfo(){
  return user_info.user_info;
}

/**
 * 获取px和rpx的比率
 * rpx = px * getRpx
 * px = rpx / getRpx
 */
function getRpx() {
      var winWidth = wx.getSystemInfoSync().windowWidth
      return 750/winWidth
}

/**
 * 获取[min, max]的整数
 */
function random (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
}

/* 
  调用云函数增加一条topic记录
  增加回调函数
*/
function addTopic(user_id, content, pictures, callback){
  var data = {
    mainuser_id: user_id,
    content: content,
    pictures: pictures
  };

  var call = callback()

  wx.cloud.callFunction({
    name: "add_topic",
    data: {
      data: data
    },
    success: res=>{
      console.log(res);
      return 1;
      // callback here
      call()
    },
    fail: err=>{
      console.log(err);
      return 0;
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
  })
}


module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.topicDetail = getTopicDetail;
module.exports.getCommentDetail = getCommentDetail;
module.exports.getUserInfo = getUserInfo;
module.exports.random = random;
module.exports.getRpx = getRpx;
module.exports.addTopic = addTopic;
module.exports.updateInfo = updateInfo;