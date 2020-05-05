// miniprogram/pages/personalAll/persoanlAll.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

      /**
       * 页面的初始数据
       */
      data: {
            navigate: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/set.png?sign=90a54d27ca3e3bf6705abc933191797e&t=1588068433',
            vip: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/vip.png?sign=fba5190995e7ed390c9ee4b678e1d572&t=1588069759',
            service: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/service.png?sign=916bba87ef5f30016181bfb05834dc93&t=1588069769',
            setting: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/setting.png?sign=5fb798a1978d2e5939220d6ca6e71eea&t=1588069784'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var that = this;
            this.setData({
                  user_id: options.user
            });

            // wx.cloud.callFunction({
            //       name: 'userinfo',
            //       data: {
            //             user_id: this.data.user_id
            //       },
            //       success: res=>{
                        
            //             that.setData({

            //             })
            //       }
            // })

            wx.cloud.callFunction({
                  name: 'userinfo',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        // console.log(res);
                        var data = res.result.data[0];
                        var jointime = new Date(data.joinTime);
                        var today = new Date();
                        var joiningday = Math.floor((today-jointime)/86400000)+1;

                        that.setData({
                              joiningDay: joiningday,
                              name: data.name,
                              avatar: data.avatar,
                              sex: data.sex,
                              region: data.region,
                              id: data._id,
                              concerning_num: data.concern.length
                        })
                  },
                  fail: err=>{
                        console.log(err);
                  }
            })

            wx.cloud.callFunction({
                  name: 'query_concerned',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        // console.log(res)
                        that.setData({
                              concerned_num: res.result.data.length
                        })
                  },
                  fail: err=>{
                        console.log(err)
                  }
            })

            // var that = this
            // //调用应用实例的方法获取全局数据
            // app.getUserInfo(function (userInfo) {
            //       console.log(userInfo)
            //       //更新数据
            //       that.setData({
            //             userInfo: userInfo,
            //       })
            // })
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      },

      /**
       * 跳转至个人主页
       */
      toPersonal: function () {
            wx.navigateTo({
                  url: '../personal/personal?user='+this.data.user_id+'&curUser='+this.data.user_id,
            })
      },

      /**
       * 跳转至设置
       */
      toSetting: function () {
            wx.navigateTo({
                  url: '../setting/setting?user='+this.data.user_id,
            })
      },

      addTopic: function(){
            util.addTopic(this.data.user_id, "MagicalHC 2020/4/21 16:48:30 必须狠狠地新婚快乐", []);
      },

      /**
       * bind:Back
       */
      back: function () {
            wx.navigateBack({
                  delta: 1
            })
      },

      /**
       * bind:Index
       */
      index: function () {
            wx.redirectTo({
                  url: '../index/index',
            })
      },

      toConcern: function(e){
            var direc = e.currentTarget.dataset.who;
            wx.navigateTo({
              url: '../concern/concern?user='+this.data.user_id+'&direction='+direc,
            })
      }
})