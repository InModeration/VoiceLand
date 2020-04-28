// pages/editinfo/editinfo.js

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
    var user_info = util.getUserInfo();
    var insterest_join = user_info.interest.join(' ')
    this.setData({
      username: user_info.username,
      icon: user_info.icon,
      motto: user_info.motto,
      background: user_info.background,
      sex: user_info.sex,
      age: user_info.age,
      region: user_info.region,
      interest: insterest_join
    });
    console.log(this.data);
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

  }
})