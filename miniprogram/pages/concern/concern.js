var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
      // text:"这是一个页面"
      focus: false,
      isShowView: true,
      hidden: '',
      height: '',
      touched: []   // 拉出按钮的窗口
  },

  bindfocus: function() {
    this.setData({
          focus: true
    })
    this.setData({
          isShowView: false
    })
  },

  bindblur: function() {

      this.setData({
            focus: false
      })
      this.setData({
            isShowView: true
      })
  },



  onLoad: function(options) {
        var user_id = options.user;
        var direc = options.direction;
        var title = (direc==='to' ? '我关心谁' : '谁关心我');

        console.log(title);

        this.setData({
          user_id: user_id,
          direction: direc,
          title: title
        })

        console.log('direction:', direc);
        // 我关心谁
        if (direc == 'to'){
          wx.cloud.callFunction({
            name: 'query_concerning',
            data: {
                  user_id: user_id
            },
            success: res=>{
                  console.log(res)
                  that.setData({
                        users: res.result.list
                  })

            },
            fail: err=>{
                  wx.showToast({
                    title: '拉取失败，请重试',
                    icon: 'none'
                  })
                  console.log(err)
            }
          })
        }
        else {
              wx.cloud.callFunction({
                name: 'query_concerned',
                data: {
                      user_id: user_id
                },
                success: res=>{
                  console.log(res)
                  that.setData({
                        users: res.result.data
                  })

                },
                fail: err=>{
                  wx.showToast({
                        title: '拉取失败，请重试',
                        icon: 'none'
                  })
                  console.log(err)
                }
              })
            }

        var that = this
        // 获取设备高度 设置scroll-view的高度
        wx.getSystemInfo({
              success: function(res) {
                    var height = res.windowHeight - app.globalData.navHeight
                    that.setData({
                          height: height  + 'px'
                    })
              },
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

  delete(e) {
    var id = parseFloat(e.currentTarget.dataset.id)
    var index = (id + 1).toString()
    var curr = "hidden[" + id + "]"    
    console.log(e)

    this.setData({
          [curr]: 'none'
    })
  },

  /**
   * bind:Back
   */
  back: function() {
    wx.navigateBack({
          delta: 1
    })
  },

  /**
   * bind:Index
   */
  index: function() {
    wx.redirectTo({
          url: '../index/index',
    })
  },

  toUser: function(e){
        var tapped_user_id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../personal/personal?user='+tapped_user_id+'&curUser='+this.data.user_id
        })
  }
})