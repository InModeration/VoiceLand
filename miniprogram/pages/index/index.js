//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
      data: {
            feed: [],
            feed_length: 0,
            userInfo: '',
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            search_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/search_black.png?sign=a9f9c7136a7416d5e91d1f75e1ca212c&t=1587887012'
      },
      //事件处理函数
      bindItemTap: function() {
            wx.navigateTo({
                  url: '../answer/answer'
            })
      },
      bindQueTap: function() {
            wx.navigateTo({
                  url: '../question/question'
            })
      },
      onLoad: function() {
            var user_id = 'hMo8uqK1xJDezX67gm04HjP91E2Hf0vEPxR5YDkV05LuREj9';//'KnGTfXz9d33f2XXbjep1IuisBz2RlHNuOAoIQgwy5vDUpzKF';
            this.setData({
                  user_id: user_id
            });

            var that = this;
            //调用应用实例的方法获取全局数据
            // app.getUserInfo(function(userInfo) {
            //       // console.log(userInfo)
            //       //更新数据
            //       that.setData({
            //             userInfo: userInfo,
            //       })
            // })
            wx.cloud.callFunction({
                  name: "userinfo",
                  data: {
                        user_id: user_id
                  },
                  success: res=>{
                        // console.log(res);
                        that.setData({
                              avatar: res.result.data[0].avatar
                        });
                  },
                  fail: console.log
            });

            wx.cloud.callFunction({
                  name: "index_user_info",
                  data: {
                        user_id: this.data.user_id,
                        topic_limit: 5
                  },
                  success: res=>{
                        // console.log(res);
                        that.setData({
                              feed: res.result.list,
                              feed_length: res.result.list.length
                        });
                  }
            });
      },

      onShow: function () {
            
      },

      // 上拉事件
      upper: function() {
            // wx.showNavigationBarLoading()
            // this.refresh();
            // console.log("upper");
            // setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 200);
      },


      lower: function(e) {
            // wx.showNavigationBarLoading();
            // var that = this;
            // setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 100);
            // console.log("lower")
      },
      //scroll: function (e) {
      //  console.log("scroll")
      //},

      //网络请求数据, 实现首页刷新
      refresh0: function() {
            var index_api = '';
            util.getData(index_api)
                  .then(function(data) {
                        //this.setData({
                        //
                        //});
                        console.log(data);
                  });
      },

      //使用本地 fake 数据实现刷新效果
      getData: function() {
            var feed = util.getData2();
            console.log("loaddata");
            var feed_data = feed.data;
            this.setData({
                  feed: feed_data,
                  feed_length: feed_data.length
            });
      },
      refresh: function() {
            wx.showToast({
                  title: '刷新中',
                  icon: 'loading',
                  duration: 3000
            });
            var feed = util.getData2();
            console.log("loaddata");
            var feed_data = feed.data;
            this.setData({
                  feed: feed_data,
                  feed_length: feed_data.length
            });
            setTimeout(function() {
                  wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 2000
                  })
            }, 3000)

      },

      //使用本地 fake 数据实现继续加载效果
      nextLoad: function() {
            wx.showToast({
                  title: '加载中',
                  icon: 'loading',
                  duration: 4000
            })
            var next = util.getNext();
            console.log("continueload");
            var next_data = next.data;
            this.setData({
                  feed: this.data.feed.concat(next_data),
                  feed_length: this.data.feed_length + next_data.length
            });
            setTimeout(function() {
                  wx.showToast({
                        title: '加载成功',
                        icon: 'success',
                        duration: 2000
                  })
            }, 3000)
      },

      /**
       * 跳转到用户个人页面
       */
      toPersonal: function (e) {
            var user_id = e.currentTarget.id;
            var host = e.currentTarget.dataset.host;
            // console.log(e);
            wx.navigateTo({
                  url: '../personal/personal?user='+user_id+'&curUser='+this.data.user_id
                  // success: (res) => {
                  //       console.log(res)
                  // },
                  // fail: (err) => {
                  //       console.log(err)
                  // }
            })
      },

      /**
       * 动态详情页
       */
      toDetail: function (e) {
            var topic_id = e.currentTarget.id;
            wx.navigateTo({
                  url: '../topic/topic?topic='+topic_id+'&user='+this.data.user_id,
                  success: (res) => {
                        console.log(res)
                  },
                  fail: (err) => {
                        console.log(err)
                  }
            })
      },

      /**
       * 跳转至个人主页
       */
      toPersonalAll: function () {
            wx.navigateTo({
                  url: '../personalAll/personalAll?user='+this.data.user_id,
            })
      },

      /**
       * 跳转至话题编辑页面
       */
      toEditTopic: function () {
            wx.navigateTo({
                  url: '../editTopic/editTopic',
            })
      },

      /**
       * 
       */
      back: function (e) {
            console.log(e)
            console.log('back')
      },

      index: function (e) {
            console.log(e)
            console.log('index')
      }
})