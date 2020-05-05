// miniprogram/pages/tailorPic/tailorPic.js
import WeCropper from '../../templates/we-cropper/we-cropper.js'

var app = getApp()

const device = wx.getSystemInfoSync()
const width = device.windowWidth
// 自定义的navbar，所以要减去一个navbar的高度
const height = device.windowHeight - 50 - getApp().globalData.navHeight

Page({
      data: {
            cropperOpt: {
                  id: 'cropper',
                  targetId: 'targetCropper',
                  pixelRatio: device.pixelRatio,
                  width,
                  height,
                  scale: 2.5,
                  zoom: 8,
                  // 对于头像的cut
                  cut: {
                        x: (width - 300) / 2,
                        y: (height - 300) / 2,
                        width: 300,
                        height: 300
                  },
                  boundStyle: {
                        color: '#04b00f',
                        mask: 'rgba(0,0,0,0.8)',
                        lineWidth: 1
                  },
                  showIndex: false
            }
      },
      touchStart(e) {
            this.cropper.touchStart(e)
      },
      touchMove(e) {
            this.cropper.touchMove(e)
      },
      touchEnd(e) {
            this.cropper.touchEnd(e)
      },
      getCropperImage() {
            var that = this
            this.cropper.getCropperImage(function (path, err) {
                  if (err) {
                        wx.showModal({
                              title: '温馨提示',
                              content: ''
                        })
                  } else {
                        /*wx.previewImage({
                              current: '', // 当前显示图片的 http 链接
                              urls: [path] // 需要预览的图片 http 链接列表
                        })*/
                        var picType = that.data.picType
                        var storageName = picType + 'TempPath'
                        
                        // 全局变量中存储临时文件路径
                        app.globalData[storageName] = path

                        // 如果是背景图，则需要在存储tempfilepath的同时
                        // 将其编码成base64格式才可以在手机上显示
                        if (picType === 'background') {
                              wx.getFileSystemManager().readFile({
                                    filePath: path,
                                    encoding: 'base64',
                                    success: res => {
                                          app.globalData.backgroundTempDisplay = 'data:image/png;base64,' + res.data;
                                    }
                              })
                        }
                        wx.navigateBack({
                              delta: 1,
                              success: (res) => {
                                    wx.showToast()
                              }
                        })
                  }
            })
      },
      uploadTap() {
            const self = this

            wx.chooseImage({
                  count: 1, // 默认9
                  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  success(res) {
                        const src = res.tempFilePaths[0]
                        //  获取裁剪图片资源后，给data添加src属性及其值
                        
                        self.cropper.pushOrign(src)
                  }
            })
      },
      onLoad(option) {
            // 传入一个type标明是封面还是头像
            var picType = option.picType
            this.setData({
                  picType: picType
            })
            const { cropperOpt } = this.data

            cropperOpt.boundStyle.color = '#04b00f'

            this.setData({ cropperOpt })
            var setname = 'cropperOpt.cut'
            
            // 如果是背景图，截取的大小发生变化
            if (picType === 'background') {
                  this.setData({
                        [setname]: {
                              x: (this.data.cropperOpt.width - 400) / 2,
                              y: (this.data.cropperOpt.height - 220) / 2,
                              width: 400,
                              height: 220
                        }
                  })
            }
            if (option.src) {
                  cropperOpt.src = option.src
                  this.cropper = new WeCropper(cropperOpt)
                        .on('ready', (ctx) => {
                              console.log(`wecropper is ready for work!`)
                        })
                        .on('beforeImageLoad', (ctx) => {
                              console.log(`before picture loaded, i can do something`)
                              console.log(`current canvas context:`, ctx)
                              wx.showToast({
                                    title: '上传中',
                                    icon: 'loading',
                                    duration: 20000
                              })
                        })
                        .on('imageLoad', (ctx) => {
                              console.log(`picture loaded`)
                              console.log(`current canvas context:`, ctx)
                              wx.hideToast()
                        })
                        .on('beforeDraw', (ctx, instance) => {
                              console.log(`before canvas draw,i can do something`)
                              console.log(`current canvas context:`, ctx)
                        })
            }
      }
})