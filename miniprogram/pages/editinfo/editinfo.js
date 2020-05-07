// pages/editinfo/editinfo.js

var util = require('../../utils/util.js')
var app = getApp()

Page({

      // 临时的图片路径存储在app.globalData当中
      // 背景图片存储一个临时的url和对应的base64格式

      /**
       * 页面的初始数据
       */
      data: {
            set_url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/set.png?sign=0f3ec632911e5995dd22f9b6c8bd92ee&t=1588044388",
            back_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/back.png?sign=f0fb37bd79d06f05cae0058cb3209223&t=1588673593',
            avatar_url: '',
            cover_url: ''
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var user_id = options.user;
            this.setData({
                  user_id: user_id
            })

            // 存储头像和背景图的临时地址
            var avatarName = 'avatarTempPath'
            var backgroundName = 'backgroundTempPath'

            var that = this;
            wx.cloud.callFunction({
                  name: 'userinfo',
                  data: {
                        user_id: user_id
                  },
                  success: res => {
                        that.setData(res.result.data[0]);
                        // console.log('兴趣: ' + that.data.interest);
                        // console.log('类型: ' + typeof(that.data.interest));
                        this.formInit();
                        // 将当前存入
                        app.globalData[backgroundName] = that.data.cover
                        app.globalData[avatarName] = that.data.avatar
                        that.setData({
                              avatar_url: app.globalData[avatarName],
                              cover_url: app.globalData[backgroundName]
                        })
                  },
                  fail: err => {
                        console.log(err);
                  }
            })
      },

      formInit: function () {
            ///////////////////////将性别转化为下标////////////////////////// 
            var sex_index = 0;
            var sex_options = ['男', '女', '保密'];
            if (this.data.sex == '女') {
                  sex_index = 1;
            } else if (this.data.sex == '保密') {
                  sex_index = 2;
            }
            /////////////////////////////////////////////////////////

            ///////////////////////将年龄转化为下标////////////////////////// 
            var age_options = [
                  '保密',
                  '0 ~ 10',
                  '10 ~ 18',
                  '18 ~ 30',
                  '30 ~ 40',
                  '40 ~ 50',
                  '50 ~ 60',
                  '60以上'
            ]
            var age_index = age_options.indexOf(this.data.age);
            /////////////////////////////////////////////////////////

            ///////////////////////将地区转化为下标////////////////////////// 
            var region_options = [
                  '保密',
                  '北京',
                  '上海',
                  '天津',
                  '重庆',
                  '香港',
                  '澳门',
                  '河北',
                  '山西',
                  '辽宁',
                  '吉林',
                  '黑龙江',
                  '江苏',
                  '浙江',
                  '安徽',
                  '福建',
                  '江西',
                  '山东',
                  '河南',
                  '湖北',
                  '湖南',
                  '广东',
                  '海南',
                  '四川',
                  '贵州',
                  '云南',
                  '陕西',
                  '甘肃',
                  '青海',
                  '台湾',
                  '内蒙古',
                  '广西',
                  '西藏',
                  '宁夏',
                  '新疆',
                  '其他'
            ]
            var region_index = region_options.indexOf(this.data.region);
            /////////////////////////////////////////////////////////

            this.setData({
                  sex_index: sex_index,
                  sex_options: sex_options,
                  age_index: age_index,
                  age_options: age_options,
                  region_index: region_index,
                  region_options: region_options
            })
      },

      valueOnChange: function (e) {
            // console.log(e);
            var key = e.target.dataset.key;
            var newData = Object();
            newData[key] = e.detail.value;
            // console.log(newData);
            this.setData(newData);
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
            var avatarName = 'avatarTempPath'
            this.setData({
                  avatar_url: app.globalData[avatarName],
                  cover_url: app.globalData.backgroundTempDisplay
            })
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

      saveInfo: function () {
            // util.updateInfo(this.data.user_id,
            //       this.data.age, this.data.avatar, this.data.cover,
            //       this.data.interest, this.data.motto + "(测试)", this.data.name,
            //       this.data.region, this.data.sex);
            var that = this;

            wx.showLoading({
                  title: '保存中'
            });


            // 判断是否进行了更改
            // 头像进行了更改
            new Promise((resolve, reject) => {
                  if (this.data.avatar != this.data.avatar_url) {
                        // 获取图片扩展名
                        var extension = this.data.avatar_url.split('.').pop()
                        var date = (new Date()).getTime()
                        wx.cloud.uploadFile({
                              // 将进行覆盖
                              cloudPath: `assets/image/avatar/diy/${this.data.user_id}.${date}.${extension}`,
                              filePath: this.data.avatar_url,
                              success: res => {
                                    var fileid = res.fileID
                                    wx.cloud.getTempFileURL({
                                          fileList: [fileid],
                                          success: res => {
                                                that.setData({
                                                      avatar: res.fileList[0].tempFileURL
                                                })
                                                resolve()
                                          },
                                          fail: err => {
                                                console.log(err)
                                          }
                                    })
                              },
                              fail: err => {
                                    console.log(err)
                              }
                        })
                  } else {
                        resolve()
                  }
            }).then(() => {
                  return new Promise((resolve, reject) => {
                        if (this.data.cover != app.globalData.backgroundTempPath) {
                              var cover = app.globalData.backgroundTempPath
                              // 获取图片扩展名
                              var extension = cover.split('.').pop()
                              var date = (new Date()).getTime()
                              wx.cloud.uploadFile({
                                    // 将进行覆盖
                                    cloudPath: `assets/image/background/diy/${this.data.user_id}.${date}.${extension}`,
                                    filePath: cover,
                                    success: res => {
                                          var fileid = res.fileID
                                          console.log(fileid)
                                          wx.cloud.getTempFileURL({
                                                fileList: [fileid],
                                                success: res => {
                                                      that.setData({
                                                            cover: res.fileList[0].tempFileURL
                                                      })
                                                      resolve()
                                                },
                                                fail: err => {
                                                      console.log(err)
                                                }
                                          })
                                    },
                                    fail: err => {
                                          console.log(err)
                                    }
                              })
                        } else {
                              resolve()
                        }
                  })
            }).then(() => {
                  console.log('调用API');
                  console.log(this.data.avatar)
                  console.log(this.data.cover)
                  app.utils.data.updateInfo(this.data.user_id,
                        this.data.age_options[this.data.age_index],
                        this.data.avatar,
                        this.data.cover,
                        this.data.interest,
                        this.data.motto,
                        this.data.name,
                        this.data.region_options[this.data.region_index],
                        this.data.sex_options[this.data.sex_index],
                        (msg) => {
                              console.log(msg);
                              wx.hideLoading({
                                    complete: (res) => {
                                          wx.showToast({
                                                title: msg,
                                          })
                                    }
                              });
                              wx.redirectTo({
                                url: '../index/index',
                              })
                        });
            })
      },

      /**
       * 返回上一页面
       */
      backLast: function () {
            wx.navigateBack({
                  delta: 1
            })
      },

      /**
       * 使用catchtap阻止冒泡事件
       */
      changePortrait: function (e) {
            var that = this
            console.log('change portrait')
            wx.showActionSheet({
                  itemList: ['拍照', '从相册选取'],
                  success: (res) => {
                        let tapIndex = res.tapIndex
                        // 拍照 
                        if (tapIndex === 0) {
                              wx.chooseImage({
                                    count: 1,
                                    sourceType: ['camera'],
                                    success: function (res) {
                                          const src = res.tempFilePaths[0]
                                          const picType = 'avatar'
                                          wx.navigateTo({
                                                url: `../tailorPic/tailorPic?src=${src}&picType=${picType}`,
                                          })
                                    },
                                    fail: function (err) {
                                          console.log(err)
                                    }
                              })
                        } else if (tapIndex === 1) { // 从相册选取
                              wx.chooseImage({
                                    count: 1,
                                    sourceType: ['album'],
                                    success: function (res) {
                                          const src = res.tempFilePaths[0]
                                          const picType = 'avatar'
                                          wx.navigateTo({
                                                url: `../tailorPic/tailorPic?src=${src}&picType=${picType}`,
                                          })
                                    },
                                    fail: function (err) {
                                          console.log(err)
                                    }
                              })
                        }
                  }
            })
      },

      changeBackground: function () {
            console.log('change background')
            wx.showActionSheet({
                  itemList: ['拍照', '从相册选取'],
                  success: (res) => {
                        let tapIndex = res.tapIndex
                        // 拍照
                        if (tapIndex === 0) {
                              wx.chooseImage({
                                    count: 1,
                                    sourceType: ['camera'],
                                    success: function (res) {
                                          const src = res.tempFilePaths[0]
                                          const picType = 'background'
                                          wx.navigateTo({
                                                url: `../tailorPic/tailorPic?src=${src}&picType=${picType}`,
                                          })
                                    },
                                    fail: function (err) {
                                          console.log(err)
                                    }
                              })
                        } else if (tapIndex === 1) { // 从相册选取
                              wx.chooseImage({
                                    count: 1,
                                    sourceType: ['album'],
                                    success: function (res) {
                                          const src = res.tempFilePaths[0]
                                          const picType = 'background'
                                          wx.navigateTo({
                                                url: `../tailorPic/tailorPic?src=${src}&picType=${picType}`,
                                          })
                                    },
                                    fail: function (err) {
                                          console.log(err)
                                    }
                              })
                        }
                  }
            })
      },

      // saveInfo: function(){
      //       app.utils.data.updateInfo(this.data.user_id,
      //             this.data.age, this.data.avatar, this.data.cover,
      //             this.data.interest, this.data.motto+"<测试>", this.data.name,
      //             this.data.region, this.data.sex);
      // },


      submitInfo: function (e) {
            console.log(e);
      }
})