// miniprogram/pages/editTopic/editTopic.js

var utils = require('../../utils/util.js')

Page({

      /**
       * 页面的初始数据
       */
      data: {
            placeholders: ['你在做什么...', '你在想什么...', '记录下你的瞬间...', '我想说点什么...'],
            placeholder: '',
            adjustPosition: false,
            maxLength: 1000,
            currLength: 0,
            pic: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/pic.png?sign=6339789eccd1155427463cfb0aa70da5&t=1588341811',
            link: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/link.png?sign=12b2d8411bef3b9653b747ce8c30a09a&t=1588341843',
            public: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/public.png?sign=2e5c67ad01fb6fd83dc14151f552aea7&t=1588345947',
            private: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/private%20.png?sign=170bb739c88be1db617e0fd2840aecdd&t=1588345929',
            location: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/location.png?sign=9d73dde782cee5d4be0edb39e2574d51&t=1588342392',
            send: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/send.png?sign=e810204c9501d8213e5e89e8c06bd455&t=1588342776',
            pub: true,
            up: '0rpx',
            up2: '102rpx',
            height: '1000rpx'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var index = utils.random(0, 4)
            var display = this.data.placeholders[index]
            this.setData({
                  placeholder: display
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
       * 统计当前输入字数
       */
      getNumber: function (e) {
            var number = e.detail.cursor
            this.setData({
                  currLength: number
            })
      },

      /**
       * 更改要发布的话题的可见范围
       */
      changeStatus: function () {
            this.setData({
                  pub: !this.data.pub
            })
      },

      /**
       * 点击输入框时，textarea下面的组件升高
       */
      upBottom: function (e) {
            var up = e.detail.height
            var up2 = up+parseInt(this.data.up2) / utils.getRpx()
            var height = parseInt(this.data.height) / utils.getRpx() - up
            this.setData({
                  up: up + 'px',
                  up2: up2 + 'px',
                  height: height + 'px'
            })
      },

      /**
       * 输入框失去焦点
       */
      downBottom: function () {
            this.setData({
                  up: '0px',
                  up2: '102rpx',
                  height: '1000rpx'
            })
      }
})