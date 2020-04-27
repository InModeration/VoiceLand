//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
    comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
    more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
    camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    var topic_data = util.topicDetail();
    this.setData({
      mainuser: topic_data.mainuser,
      topic_content: topic_data.topic_content,
      topic_time: topic_data.topic_time,
      comments: topic_data.comments,              // TODO：只取少量评论显示
      like_num: topic_data.like_num,
      comment_num: topic_data.comment_num
    });
    console.log(this.data.comments);
  },
  tapName: function(event){
    console.log(event)
  }
})
