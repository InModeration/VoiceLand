// pages/comment/comment.js

var util = require('../../utils/util.js')
var time_util = require('../../utils/time.js')

Page({

      /**
       * 页面的初始数据
       */
      data: {
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            back_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/back.png?sign=e77d67c342931895f0b2e75543930c5c&t=1588416063'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            var comment_detail = util.getCommentDetail();
            var that = this;

            // this.setData({
            //   commenter: comment_detail.commenter,
            //   content: comment_detail.content,
            //   time: comment_detail.time,
            //   replies: comment_detail.replies,
            //   like_num: comment_detail.like_num,
            //   reply_num: comment_detail.reply_num
            // });

            // 获取评论
            var comment_id = options.comment;
            wx.cloud.callFunction({
                  name: 'comment_info',
                  data: {
                        comment_id: comment_id
                  },
                  success: res => {
                        var cont = res.result.list[0];
                        cont = time_util.processTime(cont, 'time');
                        // console.log(res);
                        that.setData(cont);
                  },
                  fail: err => {
                        console.log(err);
                  }
            })

            // 获取回复
            wx.cloud.callFunction({
                  name: 'comment_reply',
                  data: {
                        comment_id: comment_id
                  },
                  success: res => {
                        var replies = res.result.list;
                        replies = time_util.processTimeInArray(replies, 'time');
                        // console.log(res);
                        that.setData({
                              replies: replies
                        });
                        wx.setNavigationBarTitle({
                              title: that.data.replies.length + ' 条回复'
                        })
                  },
                  fail: err => {
                        console.log(err);
                  }
            })
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function() {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function() {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function() {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function() {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function() {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      },

      /**
       * 返回上一页面
       */
      backLast: function() {
            wx.navigateBack({
                  delta: 1
            })
      }
})