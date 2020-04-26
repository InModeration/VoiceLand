// miniprogram/pages/chatdata/chatdata.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            access_token: '',
            env_id: 'my-project-1a1gc'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var that = this
            wx.request({
                  url: 'https://api.weixin.qq.com/cgi-bin/token',
                  data: {
                        grant_type: 'client_credential',
                        appid: 'wxf5705ecfb5a86f44',
                        secret: 'c9989b748c905042976809d03b4991d4'
                  },
                  success: (res) => {
                        that.setData({
                              access_token: res.data.access_token
                        })
                  }
            })
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
       * 获取集合
       */
      getCollection: function () {
            var that = this
            console.log(that.data.access_token)
            wx.request({
                  url: 'https://api.weixin.qq.com/tcb/databasecollectionget?access_token=' + that.data.access_token,
                  data: {
                        env: that.data.env_id
                  },
                  method: 'POST',
                  success: (res) => {
                        console.log(res)
                  }
            })
      }
})