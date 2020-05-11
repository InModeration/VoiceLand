// pages/setting/setting.js

var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    set_url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/set.png?sign=0f3ec632911e5995dd22f9b6c8bd92ee&t=1588044388"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      mask: true
    })
    var user_id = options.user;
    var that = this;

    this.setData({
      user_id: user_id
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
          avatar: data.avatar
        })
      },
      fail: err=>{
        console.log(err);
      },
      complete: res => {
        wx.hideLoading()
      }
    })
    
    // var user = util.getUserInfo();
    // this.setData({
    //   username: user.username,
    //   icon: user.icon
    // });
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
   * 跳转至编辑个人信息页面
   */
  toEdit: function () {
        wx.navigateTo({
              url: '../editinfo/editinfo?user='+this.data.user_id,
        })
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

  /**
   * 前往about页面
   */
  toAbout: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  /**
   * 前往我关心的
   */
  toConcern: function () {
    wx.navigateTo({
      url: '../concern/concern?user='+this.data.user_id+'&direction=to'
    })
  }
})