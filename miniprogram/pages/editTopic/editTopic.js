// miniprogram/pages/editTopic/editTopic.js

var utils = require('../../utils/util.js')
var app = getApp()

Page({

      /**
       * 页面的初始数据
       */
      data: {
            // test 用
            // user_id: 'hMo8uqK1xJDezX67gm04HjP91E2Hf0vEPxR5YDkV05LuREj9',

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
            remove: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/remove.png?sign=c540460c880a2a9bad8d8a911620fb08&t=1588875409',
            pub: true,
            up: '0rpx',
            up2: '102rpx',
            height: '800rpx',

            // 话题的内容
            contents: '',
            pictures: [],
            links: '',
            positions: '',
            picLenth: 0,
            fileIDs: []
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            wx.showLoading({
                  mask: true
            })
            this.setData({
                  user_id: options.user
            })

            var that = this

            var index = utils.random(0, 4)
            var display = this.data.placeholders[index]
            this.setData({
                  placeholder: display
            })
            if (options.mode === 'camera') {
                  this.chooseImg()
            }
            wx.hideLoading()
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
       * 绑定输入框的内容
       */
      getNumber: function (e) {
            var contents = e.detail.value
            var number = e.detail.cursor
            this.setData({
                  currLength: number,
                  contents: contents
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
       * 图片不予显示
       */
      upBottom: function (e) {
            var up = e.detail.height
            var up2 = up + parseInt(this.data.up2) / utils.getRpx()
            var height = parseInt(this.data.height) / utils.getRpx() - up
            this.setData({
                  up: up + 'px',
                  up2: up2 + 'px',
                  height: height + 'px',
                  picLenth: 0
            })
      },

      /**
       * 输入框失去焦点
       */
      downBottom: function () {
            this.setData({
                  up: '0px',
                  up2: '102rpx',
                  height: '800rpx',
                  picLenth: this.data.pictures.length
            })
      },

      /**
       * bind:Back监听函数
       */
      back: function (e) {
            wx.showModal({
                  title: '系统将不会保存当前编辑内容',
                  content: '返回会导致您的内容将丢失，确定吗？',
                  cancelText: '继续编辑',
                  confirmText: '确认退出',
                  success: (res) => {
                        if (res.confirm) {
                              wx.navigateBack({
                                    delta: 1
                              })
                        } else if (res.cancel) {

                        }
                  },
                  fail: (err) => {
                        console.log(err)
                        wx.showToast({
                              title: '错误',
                              icon: 'none'
                        })
                  }
            })
      },

      /**
       * bind:Index监听函数
       */
      index: function (e) {

      },

      /**
       * 发送话题按钮
       */
      sendTopic: function () {
            if (this.data.currLength === 0) {
                  wx.showToast({
                        title: '不能发送空白话题！',
                        icon: 'none'
                  })
            } else {
                  wx.showLoading({
                    mask: true
                  })
                  if (this.data.pictures.length === 0) {
                        var data = this.data
                        app.utils.data.addTopic(data.user_id, data.contents, data.fileIDs, () => {
                              wx.hideLoading({
                                    success: (res) => {
                                          wx.showToast({
                                                title: '发送成功！',
                                                success: (res) => {
                                                      console.log(res)
                                                },
                                                fail: (err) => {
                                                      console.log(err)
                                                }
                                          })
                                    },
                                    fail: (err) => {
                                          console.log(err)
                                    },
                                    complete: () => {
                                          wx.redirectTo({
                                                url: '../index/index',
                                          })
                                    }
                              })
                        })
                  } else {
                        var data = this.data
                        wx.showLoading({
                              mask: true
                        })
                        // 上传图片至云存储
                        var count = 0
                        this.uploadImgAndSend(count, () => {
                              console.log('开始上传')
                        })
                  }
            }
      },

      /**
       * 选择照片
       */
      chooseImg: function (e) {
            if (this.data.pictures.length !== 0) {
                  wx.showToast({
                        title: '已上传的图片将清空',
                        icon: 'none'
                  })
            }
            var that = this
            wx.chooseImage({
                  count: 9,
                  success: res => {
                        console.log(res)
                        that.setData({
                              pictures: res.tempFilePaths,
                              picLenth: res.tempFilePaths.length
                        })
                  }
            })
      },

      /**
       * 预览照片
       */
      previewImg: function (e) {
            var that = this
            var imgUrl = e.currentTarget.dataset.url
            wx.previewImage({
                  current: imgUrl,
                  urls: that.data.pictures
            })
      },

      /**
       * 删除图片
       */
      deleteImg: function (e) {
            var index = e.currentTarget.dataset.delete
            var pictures = this.data.pictures
            this.setData({
                  pictures: pictures.slice(0, index).concat(pictures.slice(index + 1, pictures.length))
            })
      },

      /**
       * 递归上传图片至云存储
       * 存储fileid
       * 上传至云数据库
       */
      uploadImgAndSend: function (count, callback) {
            callback()
            if (count === this.data.pictures.length - 1) {
                  var new_callback = () => {
                        console.log('图片上传完毕,开始调用发送topic的API')
                        var data = this.data
                        app.utils.data.addTopic(data.user_id, data.contents, data.fileIDs, () => {
                              wx.hideLoading({
                                    success: (res) => {
                                          wx.showToast({
                                                title: '发送成功！',
                                                success: (res) => {
                                                      console.log(res)
                                                },
                                                fail: (err) => {
                                                      console.log(err)
                                                }
                                          })
                                    },
                                    fail: (err) => {
                                          console.log(err)
                                    },
                                    complete: () => {
                                          wx.redirectTo({
                                                url: '../index/index',
                                          })
                                    }
                              })
                        })
                  }
            } else if (count === this.data.pictures.length) {
                  console.log('发送成功,返回主页')
                  return
            } else {
                  var new_callback = () => {
                        console.log('上传图片中')
                  }
            }
            var that = this
            var extension = this.data.pictures[count].split('.').pop()
            wx.cloud.uploadFile({
                  // 命名规则： 用户id - getTime - count . extension
                  cloudPath: `assets/image/topic/${this.data.user_id}-${new Date().getTime()}-${count}.${extension}`,
                  filePath: this.data.pictures[count],
                  success: res => {
                        var fileid = res.fileID
                        var fileIDs = that.data.fileIDs
                        fileIDs.push(fileid)
                        // 获取fileid
                        that.setData({
                              fileIDs: fileIDs
                        })
                  },
                  fail: err => {
                        console.log(err)
                  },
                  complete: res => {
                        // 继续导入
                        that.uploadImgAndSend(++count, new_callback)
                  }
            })
      }
})