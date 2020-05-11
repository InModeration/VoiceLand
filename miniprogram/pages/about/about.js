// miniprogram/pages/about/about.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            old: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/old.png?sign=d9aff7bea4f89f518d498332cadd7775&t=1589174942',
            new: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/new.png?sign=70a7696ae2bec7c46965817db5a684be&t=1589174957',
            watch: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/watch.png?sign=a70ce07f43c0c137ae4d219e5fbe4e8a&t=1589175781',
            play: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/play.png?sign=f915c7f98186d1d28f72f2870c601b18&t=1589176063',
            work: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/work.png?sign=8f2a2a22654ea2ea1d5d6df6922f3220&t=1589175914',
            walk: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/walk.png?sign=58380ebcc032c4a5930d76b6bbe9c69a&t=1589176390',
            sport: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/sport.png?sign=28c4b23434a1b6018c48002813f9fecd&t=1589176771',
            bachelor: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/bachelor.png?sign=0dd44f60625a9d1cacfa005373383618&t=1589176875',
            express: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/express.png?sign=9733b8715e023bd7349e828cc4fbc6e2&t=1589177146',
            gift: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/gift.png?sign=f00b5dde333d5c56ecd59623fe33329f&t=1589177180',
            idea: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/idea.png?sign=68c54f3d1b0c0f30aed8d6cb9c83995e&t=1589177190'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

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
       * 上一级
       */
      back: function () {
            wx.navigateBack({
                  delta: 1
            })
      },

      /**
       * 返回主页
       */
      index: function () {
            wx.redirectTo({
                  url: '../index/index',
            })
      }
})