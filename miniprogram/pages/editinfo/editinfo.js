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
    var user_id = options.user;
    this.setData({
      user_id: user_id
    });

    var that = this;
    wx.cloud.callFunction({
      name: 'userinfo',
      data: {
        user_id: user_id
      },
      success: res=>{
        that.setData(res.result.data[0]);
        console.log('兴趣: ' + that.data.interest);
        console.log('类型: ' + typeof(that.data.interest));
      },
      fail: err=>{
        console.log(err);
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

  saveInfo: function(){
    util.updateInfo(this.data.user_id, 
      this.data.age, this.data.avatar, this.data.cover, 
      this.data.interest, this.data.motto+"(测试)", this.data.name, 
      this.data.region, this.data.sex);
  }
})