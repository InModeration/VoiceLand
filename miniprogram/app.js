//app.js
App({
      onLaunch: function() {

            if (!wx.cloud) {
                  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
            } else {
                  wx.cloud.init({
                        // env 参数说明：
                        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                        //   如不填则使用默认环境（第一个创建的环境）
                        env: 'voice-land-qcrwm',
                        traceUser: true,
                  })
                  console.log('cloud init!');
            }

            this.utils = {
                  data: require('./utils/data.js'),
                  util: require('./utils/util.js'),
                  time: require('./utils/time.js'),
                  router: require('./utils/router.js')
            }

            this.tourist_flag = '__TOURIST__'

            // 获取胶囊组件、手机屏幕的信息，设定高度
            let menuButtonObject = wx.getMenuButtonBoundingClientRect();
            wx.getSystemInfo({
                  success: res => {

                        //导航高度
                        let statusBarHeight = res.statusBarHeight,
                              navTop = menuButtonObject.top,
                              navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
                        this.globalData.navHeight = navHeight;
                        this.globalData.navTop = navTop;
                        this.globalData.windowHeight = res.windowHeight;
                  },
                  fail(err) {
                        console.log(err);
                  }
            })
      },
      getUserInfo: function(cb) {
            var that = this
            if (this.globalData.userInfo) {
                  typeof cb == "function" && cb(this.globalData.userInfo)
            } else {
                  //调用登录接口
                  wx.login({
                        success: function() {
                              wx.getUserInfo({
                                    success: function(res) {
                                          that.globalData.userInfo = res.userInfo
                                          typeof cb == "function" && cb(that.globalData.userInfo)
                                    }
                              })
                        }
                  })
            }
            // console.log(this.globalData)
      },
      globalData: {
            userInfo: null
      }
})