// pages/comment/comment.js

var util = require('../../utils/util.js')
var time_util = require('../../utils/time.js')
var app = getApp()

Page({

      /**
       * 页面的初始数据
       */
      data: {
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            liked_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/liked.png?sign=6c22cc8c58c58c132eb82cf3c107cec6&t=1588600467',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            back_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/back.png?sign=e77d67c342931895f0b2e75543930c5c&t=1588416063',
            // 本地时间
            currTime: '',
            // 评论时间
            thisTime: '',

            // reply组件相关
            replyValue: '',
            replyHidden: true,
            up: '0',
            isFocus: false
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            var that = this;

            // 获取本地时间
            var currTime = app.utils.time.getLocalTime()

            this.setData({
                  comment_id: options.comment,
                  user_id: options.user,
                  currTime: currTime
            });

            wx.cloud.callFunction({
                  name: 'comment_info',
                  data: {
                        user_id: this.data.user_id,
                        comment_id: this.data.comment_id
                  },
                  success: res => {
                        var cont = res.result.list[0]
                        var thistime = app.utils.time.getTime(cont.time)
                        var time = app.utils.time.getGap(thistime, currTime)
                        if (time)
                              cont.time = time
                        cont = app.utils.time.processTime(cont, 'time');
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
                        user_id: this.data.user_id,
                        comment_id: this.data.comment_id
                  },
                  success: res => {
                        console.log(res);
                        var replies = res.result.list;
                        var len = replies.length
                        var times = []
                        for (let i = 0; i < len; i++) {
                              var gap = app.utils.time.getGap(replies[i].time, currTime)
                              times.push(gap)
                        }
                        replies = app.utils.time.processTimeInArray(replies, 'time');
                        // console.log(res);
                        that.setData({
                              replies: replies
                        });
                        for (let i = 0; i < len; i++) {
                              if (times[i]) {
                                    var timeset = 'replies[' + i + '].time'
                                    that.setData({
                                          [timeset]: times[i]
                                    })
                              }
                        }
                        console.log(that.data.replies)
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
      },

      /**
       * 获取点击的用户的id，进行跳转
       */
      clickRouter: function(e) {
            var user_id = e.currentTarget.dataset.viewuserid
            var curr_id = this.data.user_id
            app.utils.router.toPersonal(curr_id, user_id)
      },

      /**
       * 点击内容，弹出框
       */
      clickCommentContent: function(e) {
            var that = this
            // 点击的对象的id
            var replyeeId = e.currentTarget.dataset.replyeeid
            // console.log(e)
            wx.showActionSheet({
                  itemList: ['赞', '回复', '举报'],
                  success: res => {
                        if (res.tapIndex === 0){
                              if (that.data.liked){
                                    wx.showToast({
                                          title: '您已经点过赞啦！',
                                          icon: 'none'
                                    })
                              }
                              else {
                                    that.addCommentLike()
                              }
                        }
                        else if (res.tapIndex === 2) {
                              wx.showToast({
                                    title: '开发中',
                                    icon: 'none'
                              })
                        } else if (res.tapIndex === 1) {
                              that.setData({
                                    replyHidden: false,
                                    isFocus: true,
                                    replyeeId: replyeeId
                              })
                        }
                  }
            })
      },

      clickReplyContent: function(e) {
            var that = this
            // 点击的对象的id
            var replyeeId = e.currentTarget.dataset.replyeeid
            var replyIdx = e.currentTarget.dataset.idx
            var replyId = e.currentTarget.dataset.replyid
            var flag = e.currentTarget.dataset.isComment
            // console.log(e)
            wx.showActionSheet({
                  itemList: ['赞', '回复', '举报'],
                  success: res => {
                        if (res.tapIndex === 0){
                              if (flag == 'true'){
                                    if (that.data.liked){
                                          wx.showToast({
                                            title: '您已经点过赞啦！',
                                            icon: 'none'
                                          })
                                    }
                                    else {
                                          that.addComment()
                                    }
                              }
                              else {
                                    if (that.data.replies[replyIdx].liked){
                                          wx.showToast({
                                            title: '您已经点过赞啦！',
                                            icon: 'none'
                                          })
                                    }
                                    else {
                                          // 为了适配点击图标点赞的方法，此处需要利用数据构造一个
                                          // dummy 事件对象传递到方法中
                                          that.addReplyLike({
                                                currentTarget: {
                                                      id: replyId,
                                                      dataset: {
                                                            idx: replyIdx,
                                                      }
                                                }
                                          })
                                    }      
                              }
                        }
                        else if (res.tapIndex === 2) {
                              wx.showToast({
                                    title: '开发中',
                                    icon: 'none'
                              })
                        } else if (res.tapIndex === 1) {
                              that.setData({
                                    replyHidden: false,
                                    isFocus: true,
                                    replyeeId: replyeeId
                              })
                        }
                  }
            })
      },


      /**
       * bind:Focus
       */
      replyFocus: function(e) {
            var up = e.detail.height
            console.log(e)
            this.setData({
                  up: up + 'px'
            })
      },

      /**
       * bind:Blur
       */
      replyBlur: function() {
            this.setData({
                  replyHidden: true,
                  isFocus: false
            })
      },

      /**
       * bind:Input
       */
      replyInput: function(e) {
            var replyContent = e.detail.value
            this.setData({
                  replyContent: replyContent
            })
      },

      /**
       * bind:Confirm
       */
      replySend: function () {
            var that = this
            var comment_id = this.data.comment_id
            var replier_id = this.data.user_id
            var repliee_id = this.data.replyeeId
            var content = this.data.replyContent
            wx.showLoading()
            app.utils.data.addReply(comment_id, replier_id, repliee_id, content, ()=>{
                  wx.hideLoading()
                  that.replyBlur()
                  that.onLoad({
                        comment: comment_id,
                        user: replier_id
                  })
            })
      },

      addCommentLike: function(){
            var that = this;
            if (this.data.liked){
                  wx.showToast({
                    title: '您已经点过赞啦！',
                    icon: "none"
                  })
            }
            else {
                  app.utils.data.addCommentLike(this.data.comment_id, this.data.user_id, 
                        ()=>{
                              that.setData({
                                    liked: true,
                                    like_num: that.data.like_num+1
                              })
                        })
            }
      },

      addReplyLike: function(e){
            // console.log(e);
            var that = this;
            var idx = e.currentTarget.dataset.idx;
            var reply_id = e.currentTarget.id;
            var like_num = this.data.replies[idx].like_num;

            var reply_liked_field = 'replies['+idx+'].liked';
            var reply_likenum_field = 'replies['+idx+'].like_num';

            if (this.data.replies[idx].liked){
                  wx.showToast({
                    title: '您已经点过赞啦！',
                    icon: "none"
                  })
            }
            else {
                  app.utils.data.addReplyLike(reply_id, this.data.user_id, 
                        ()=>{
                              that.setData({
                                    [reply_liked_field]: true,
                                    [reply_likenum_field]: like_num+1
                              })
                        })
            }
      }
})