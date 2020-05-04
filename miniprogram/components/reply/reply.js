// miniprogram/components/reply/reply.js
Component({
      data: {
            send_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/send.png?sign=de38d777dfbcf0a42929b31c31ab1219&t=1588519726',
            adjustPosition: false,
      },
      properties: {
            replyValue: {
                  type: String,
                  value: ''
            },
            hidden: {
                  type: Boolean,
                  value: true
            },
            keyboardHeight: {
                  type: String,
                  value: '50px'
            },
            autoFocus: {
                  type: Boolean,
                  value: false
            }
      },

      /**
       * 方法列表
       */
      methods: {
            // 输入框获取焦点
            onFocus: function (e) {
                  this.triggerEvent('Focus', e)
            },

            // 输入监听
            onInput: function (e) {
                  this.triggerEvent('Input', e.detail)
            },

            // 输入框焦点丢失
            onBlur: function () {
                  this.triggerEvent('Blur')
            },

            // 确认
            onConfirm: function () {
                  this.triggerEvent('Confirm')
            }
      }
})