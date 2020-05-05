// components/navbar/index.js
const App = getApp();

Component({
      options: {
            addGlobalClass: true,
      },
      externalClasses: ['custom-class'],
      /**
       * 组件的属性列表
       */
      properties: {
            pageName: String,
            shownav: {
                  type: Boolean,
                  value: true
            },
            showindex: {
                  type:Boolean,
                  value: true
            },
            bgColor: {
                  type: String,
                  value: '#fff'
            },
            iconColor: {
                  type: String,
                  value: '#000'
            }
      },

      /**
       * 组件的初始数据
       */
      data: {
            
      },
      lifetimes: {
            attached: function() {
                  this.setData({
                        navHeight: App.globalData.navHeight,
                        navTop: App.globalData.navTop
                  })
            }
      },
      /**
       * 组件的方法列表
       */
      methods: {
            // 向父组件传递信息
            
            //回退
            onBack: function() {
                  this.triggerEvent('Back')
            },
            //回主页
            onIndex: function() {
                  this.triggerEvent('Index')
            }
      }
})