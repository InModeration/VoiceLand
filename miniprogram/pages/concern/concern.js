Page({

  /**
   * 页面的初始数据
   */
    data: {
      // text:"这是一个页面"
      focus: false,
      isShowView: true,
      messages: [{
                  title: "梁志彬",
            url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/liangzhibin.jpg?sign=8a2156a910d0a6a0788203c87d5e4f1d&t=1588008656",
            message: "思念、愿望什么的都是一场空，被这种虚幻的东西绊住脚，什么都做不到",
                  time: "15:15",
                  count: 5
            },
            {
                  title: "李权国",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/liquanguo.jpg?sign=56275771a780cead1ec79ca404fbbeac&t=1588008672",
                  message: "哈哈哈，我要一统江湖啦，",
                  time: "15:15",
                  count: 22
            },
            {
                  title: "张顺飞",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/timg.jpg?sign=62b54818fd524e95dbbf1e6069ebf253&t=1588008684",
                  message: "这个绝望的世界没有存在的价值，所剩的只有痛楚",
                  time: "12:13",
                  count: 1
            },
            {
                  title: "任冲",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/renchong.jpg?sign=f3d25005a5ee3bab9e323ec163d0f0e8&t=1588008698",
                  message: "感受到了丰收的喜悦",
                  time: "12:11",
                  count: 0
            },
            {
                  title: "陌生人",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head1.jpeg?sign=4b3d0663291c4727be582fc28b52e8fb&t=1588008861",
                  message: "我们的春天来啦，哈哈哈",
                  time: "11:35",
                  count: 0
            },
            {
                  title: "佐助",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head2.jpeg?sign=db4a30a1c9ab2b8161652ab926dce6c7&t=1588008876",
                  message: "为什么你会这么弱？就是因为你对我的仇恨...还不够深...",
                  time: "08:23",
                  count: 0
            },
            {
                  title: "小程序",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head3.jpg?sign=886f123dd110bb98208d845d20e19f15&t=1588008887",
                  message: "这个IDE方便都不要配置了",
                  time: "03:21",
                  count: 5
            },
            {
                  title: "git",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head4.png?sign=69e9e8fa2a92c74a4df59ff27d7f8546&t=1588008901",
                  message: "小程序的git接口真牛逼",
                  time: "03:08",
                  count: 99
            },
            {
                  title: "唐郅杰",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head5.jpeg?sign=4d97bc14500cfc079c0d5ac24060b447&t=1588008915",
                  message: "不看好小程序",
                  time: "02:45",
                  count: 0
            },
            {
                  title: "陈经理",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head6.jpg?sign=363f2976c1308609d5dfbe94cddb2d3e&t=1588008927",
                  message: "你好",
                  time: "01:09",
                  count: 0
            },
            {
                  title: "懂哥",
                  url: "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/test/head7.jpeg?sign=7c94cdf187f6304c2aa641a94cf4eb2d&t=1588008940",
                  message: "在这世上，有光的地方就必定有黑暗，所谓的胜者，也就是相对败者而言",
                  time: "00:24",
                  count: 2
            }
        ],
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
            },
            fail: err=>{
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
                },
                fail: err=>{
                      console.log(err)
                }
              })
            }

        var that = this
        // 获取设备高度 设置scroll-view的高度
        wx.getSystemInfo({
              success: function(res) {
                    console.log(res)
                    that.setData({
                          height: res.windowHeight + 'px'
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
  }
})