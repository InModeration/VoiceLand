// components/register/register.js
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideModal: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    input_name: '',
    // hide_modal: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputOnChange: function(e){
      this.setData({
        input_name: e.detail.value
      });
      console.log(e.detail.value);
    },

    // 需要将页面默认的用户设置成游客，然后使用选择使用游客模式的时候
    // 什么都不做即可
    useTourist: function(){
      this.setData({
        hideModal: true
      })
    },

    cancel: function(){
      
    },

    register: function(){
      // TODO: 用户昵称检查

      wx.showLoading({
        title: '注册中'
      })

      app.utils.util.register(this.data.input_name,
          // 成功回调
          ()=>{
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: '注册成功！',
                  complete: res=>{
                    wx.redirectTo({
                      url: '../../pages/index/index'
                    })
                  }
                })
              },
            })
          },
          //失败回调
          (msg)=>{
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: msg
                })
              },
            })
          },
        )
    }
  }
})
