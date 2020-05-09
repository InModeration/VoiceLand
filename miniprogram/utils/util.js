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

// var index = require('../data/data_index.js')
// var index_next = require('../data/data_index_next.js')
// var discovery = require('../data/data_discovery.js')
// var discovery_next = require('../data/data_discovery_next.js')
// var topic_detail = require('../data/data_topic_detail.js')
// var comment_detail = require('../data/data_comment_detail.js')
// var user_info = require('../data/data_user_info.js')

function getData(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
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

// function getData2(){
//   return index.index;
// }

// function getNext(){
//   return index_next.next;
// }

// function getDiscovery(){
//   return discovery.discovery;
// }

// function discoveryNext(){
//   return discovery_next.next;
// }

// function topicDetail(){
//   return topic
// }

// function getTopicDetail(){
//   return topic_detail.topic_detail;
// }

// function getCommentDetail(){
//   return comment_detail.comment_detail;
// }

// function getUserInfo(){
//   return user_info.user_info;
// }

/**
 * 获取px和rpx的比率
 * rpx = px * getRpx
 * px = rpx / getRpx
 */
function getRpx() {
  var winWidth = wx.getSystemInfoSync().windowWidth
  return 750 / winWidth
}

/**
 * 获取[min, max]的整数
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function register(name, success_callback, fail_callback) {
  var scb = success_callback;
  var fcb = fail_callback;
  wx.login({
    success(res) {
      if (res.code) {
        //获取用户openid
        wx.cloud.callFunction({
          name: 'get_openid',
          data: {
            code: res.code
          },
          success: res => {
            //     console.log(res);
            // 检查用户是否已经注册过了
            wx.cloud.callFunction({
              name: 'map_user_id',
              data: {
                open_id: res.result.openid
              },
              success: int_res => {
                // 用户的opneid已经存在，说明用户已经注册过了
                if (int_res.result.data.length != 0) {
                  wx.showToast({
                    title: '错误！该用户已经注册过了！',
                    icon: 'none'
                  })
                } else {
                  wx.showLoading({
                    title: '注册中',
                  })
                  wx.cloud.callFunction({
                    name: 'register_user',
                    data: {
                      open_id: res.result.openid,
                      name: name
                    },
                    success: reg_res => {
                      wx.hideLoading({
                        complete: (res) => {
                          wx.showToast({
                            title: '注册成功！',
                            complete: a => {
                              wx.redirectTo({
                                url: '../index/index'
                              })
                            }
                          })
                        },
                      })
                      scb()
                    },
                    fail: err => {
                      fcb('注册失败!服务器端返回错误')
                    }
                  })
                }
              },
              fail: int_err => {
                fcb('查询用户注册状态失败!')
              }
            })
          },
          fail: err => {
            fcb('注册失败，请重试！')
            console.log(err);
          }
        })
      } else {
        fcb('微信账户登录失败，请重试！')
        console.log(res)
      }
    }
  })
}

/**
 * 对象转数组
 */
function objToArray(array) {
  var arr = []
  for (var i in array) {
    arr.push(array[i]);
  }
  return arr;
}


// module.exports.getData = getData;
// module.exports.getData2 = getData2;
// module.exports.getNext = getNext;
// module.exports.getDiscovery = getDiscovery;
// module.exports.discoveryNext = discoveryNext;
// module.exports.topicDetail = getTopicDetail;
// module.exports.getCommentDetail = getCommentDetail;
// module.exports.getUserInfo = getUserInfo;
module.exports.random = random;
module.exports.getRpx = getRpx;
module.exports.register = register;
module.exports.objToArray = objToArray;