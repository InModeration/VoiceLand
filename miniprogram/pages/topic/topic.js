//answer.js
var util = require('../../utils/util.js')
var time_util = require('../../utils/time.js')
var app = getApp()
Page({
      data: {
            userInfo: {},
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            send_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/send.png?sign=de38d777dfbcf0a42929b31c31ab1219&t=1588519726',
            // 本地时间
            currentTime: '',
            // 话题的时间
            thisTime: '',
            adjustPosition: false,
            comment_content: '',
            up: '0',

            // 回复相关
            reply: true,
            reply_content: '',
            ifFocus: false,
            replyUp: '0',
            replyee: '',
            selectComment: ''

      },
      //事件处理函数
      bindItemTap: function() {
            wx.navigateTo({
                  url: '../answer/answer'
            })
      },
      onLoad: function(options) {
            // console.log('onLoad')
            console.log(options)
            var that = this;
            //调用应用实例的方法获取全局数据
            // app.getUserInfo(function(userInfo){
            //   //更新数据
            //   that.setData({
            //     userInfo:userInfo
            //   })
            // })
            // var topic_data = util.topicDetail();
            // this.setData({
            //   mainuser: topic_data.mainuser,
            //   topic_content: topic_data.topic_content,
            //   topic_time: topic_data.topic_time,
            //   // comments: topic_data.comments,             
            //   like_num: topic_data.like_num,
            //   comment_num: topic_data.comment_num
            // });
            var currTime = app.utils.time.getLocalTime()

            this.setData({
                  topic_id: options.topic,
                  user_id: options.user,
                  currentTime: currTime
            })

            // var topic_id = options.topic;
            wx.cloud.callFunction({
                  name: "topic_detail",
                  data: {
                        topic_id: this.data.topic_id
                  },
                  success: res => {
                        console.log(res)
                        var topic = res.result.list[0];
                        // console.log(topic.time)
                        that.setData({
                              thisTime: app.utils.time.getTime(topic.time)
                        })
                        topic = app.utils.time.processTime(topic, 'time');
                        that.setData(
                              topic
                        );
                  },
                  fail: err => {
                        console.log(err);
                  },
                  complete: function(com) {
                        var currTime = that.data.currentTime
                        var thisTime = that.data.thisTime
                        // return undefined if over 24 hours
                        var time = app.utils.time.getGap(thisTime, currTime)
                        that.setData({
                              time: time
                        })
                  }
            })

            wx.cloud.callFunction({
                  name: "topic_comment_user",
                  data: {
                        topic_id: this.data.topic_id
                  },
                  success: res => {
                        // console.log(res);
                        // console.log('\n\n-------------------------------------------\n\n');
                        // console.log(mergeReplies(res.result.list));

                        var coms = res.result.list
                        
                        var len = coms.length
                        var comment_times = []
                        for (let i = 0; i < len; i++) {
                              let this_comment_time = app.utils.time.getTime(coms[i].comment_time)
                              var gap = app.utils.time.getGap(this_comment_time, currTime)
                              comment_times.push(gap)
                        }
                        coms = time_util.processTimeInArray(coms, 'comment_time');

                        that.setData({
                              comments: coms
                        })
                        for (let i = 0; i < len; i++) {
                              if (comment_times[i]) {
                                    var comment_time_name = 'comments[' + i + '].comment_time'
                                    that.setData({
                                          [comment_time_name]: comment_times[i]
                                    })
                              }
                        }
                  },
                  fail: err => {
                        console.log(err);
                  }
            });
      },

      tapName: function(event) {
            console.log(event);
      },

      toMoreReplies: function(e) {
            wx.navigateTo({
                  url: '../comment/comment?comment=' + e.currentTarget.id + '&user=' + this.data.user_id
            });
      },

      //测试回复功能
      addComment: function() {
            app.utils.data.addComment(this.data.topic_id, this.data.user_id,
                  "鹏哥 国际周和国际周的学分有说法了不..")
      },

      /**
       * bind:Back
       */
      back: function() {
            wx.navigateBack({
                  delta: 1
            })
      },

      /**
       * bind:Index
       */
      index: function() {
            wx.redirectTo({
                  url: '../index/index',
            })
      },

      /**
       * 点击评论框
       * 评论框升高至键盘上方
       */
      startInput: function (e) {
            var up = e.detail.height
            this.setData({
                  up: up + 'px'
            })
      },

      /**
       * 结束输入
       */
      endInput: function (e) {
            this.setData({
                  up: '0'
            })
      },

      /**
       * 编辑评论
       */
      editComment: function (e) {
            this.setData({
                  comment_content: e.detail.value
            })
      },

      /**
       * 发送评论
       */
      sendComment: function () {
            var content = this.data.comment_content
            var that = this
            if (content.length === 0) {
                  wx.showToast({
                        title: '评论不能为空！',
                        icon: 'none'
                  })
                  return
            }
            var topic_id = this.data.topic_id
            var user_id = this.data.user_id
            wx.showLoading({})
            app.utils.data.addComment(topic_id, user_id, content, ()=>{
                  wx.hideLoading()
                  that.setData({
                        comment_content: ''
                  })
                  that.onLoad({
                        topic: topic_id,
                        user: user_id
                  })
            })
      },

      /**
       * 点击别人的评论
       */
      clickComment: function (e) {
            var that = this
            // 点击的用户的id
            var selectUser = e.currentTarget.dataset.user_id
            // 点击的评论的id
            var selectComment = e.currentTarget.dataset.commentid
            wx.showActionSheet({
                  itemList: ['赞', '回复', '举报'],
                  success: res=>{
                        console.log(res)
                        var index = res.tapIndex
                        if (index === 0 || index === 2) {
                              wx.showToast({
                                    title: '开发中',
                                    icon: 'none'
                              })
                        } else if (index === 1) {
                              // 弹出回复框
                              that.setData({
                                    reply: false,
                                    ifFocus: true,
                                    replyee: selectUser,
                                    selectComment: selectComment
                              })
                        }
                  }
            })
      },

      /**
       * 弹出回复编辑框
       */
      editReply: function (e) {
            console.log(e)
            var up = e.detail.detail.height
            this.setData({
                  reply: false,
                  replyUp: up + 'px'
            })
      },

      /**
       * 收起回复编辑框
       */
      endReply: function () {
            this.setData({
                  replyUp: '0px',
                  reply: true
            })
      },

      /**
       * 编辑回复绑定数据
       */
      editReply: function (e) {
            this.setData({
                  reply_content: e.detail.value
            })
      },

      /**
       * 发送回复
       */
      sendReply: function (e) {
            var that = this
            var comment_id = this.data.selectComment
            var replier_id = this.data.user_id
            var repliee_id = this.data.replyee
            var content = this.data.reply_content
            wx.showLoading({})
            app.utils.data.addReply(comment_id, replier_id, repliee_id, content, ()=>{
                  wx.hideLoading()
                  that.endReply()
                  that.setData({
                        reply_content: ''
                  })
                  that.onLoad({
                        topic: that.data.topic_id,
                        user: that.data.user_id
                  })
            })
      }
})