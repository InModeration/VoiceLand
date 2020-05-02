// miniprogram/pages/personal/personal.js
var app = getApp()
Page({

      /**
       * 页面的初始数据
       */
      data: {
            userInfo: {},
            backgroundImage: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/background/default/default-1.jpg?sign=d366479029f07f9b85c2804f1cd98724&t=1587886069',
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            back_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/back.png?sign=e77d67c342931895f0b2e75543930c5c&t=1588416063'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            var that = this;

            var user_id = options.user;
            var cur_user_id = options.curUser;
            // console.log('host: '+host);

            this.setData({
                  user_id: user_id,
                  cur_user_id: cur_user_id
            });

            wx.cloud.callFunction({
                  name: 'userinfo',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        var data = res.result.data[0];
                        that.setData({
                              name: data.name,
                              avatar: data.avatar,
                              sex: data.sex,
                              region: data.region,
                              id: data._id,
                              cover: data.cover,
                              motto: data.motto
                        });
                  },
                  fail: err=>{
                        console.log(err);
                  }
            })

            wx.cloud.callFunction({
                  name: 'user_topic',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        // console.log(res);
                        that.setData({
                              topics: res.result.data
                        });
                  },
                  fail: err=>{
                        console.log(err);
                  }
            })

            //调用应用实例的方法获取全局数据
            // app.getUserInfo(function(userInfo) {
            //       console.log(userInfo)
            //       //更新数据
            //       that.setData({
            //             userInfo: userInfo,
            //       })
            // })
            // console.log(app)
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
      * 动态详情页
      */
      toDetail: function () {
            wx.navigateTo({
                  url: '../topic/topic'
            })
      },
      displayNickname: function (e) {
            var scrollTop = e.detail.scrollTop
            if (scrollTop >= 150)
                  wx.setNavigationBarTitle({
                        title: this.data.name,
                  })
            else
                  wx.setNavigationBarTitle({
                        title: '',
                  })
      },

      editInfo: function(e){
            if (this.data.user_id == this.data.cur_user_id){
                  wx.navigateTo({
                        url: '../editinfo/editinfo?user='+this.data.cur_user_id,
                  })
            }
      },

      /**
       * 返回至上一页面
       */
      backLast: function () {
            wx.navigateBack({
                  delta: 1
            })
      }
})