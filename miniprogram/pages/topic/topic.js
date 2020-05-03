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
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            // 本地时间
            currentTime: '',
            // 话题的时间
            thisTime: ''
      },
      //事件处理函数
      bindItemTap: function() {
            wx.navigateTo({
                  url: '../answer/answer'
            })
      },
      onLoad: function(options) {
            // console.log('onLoad')
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
                        var topic = res.result.list[0];
                        console.log(topic.time)
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
                  complete: function (com) {
                        var currTime = that.data.currentTime
                        var thisTime = that.data.thisTime
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

                        var coms = res.result.list;
                        coms = time_util.processTimeInArray(coms, 'comment_time');

                        that.setData({
                              comments: coms
                        })
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
      }
})