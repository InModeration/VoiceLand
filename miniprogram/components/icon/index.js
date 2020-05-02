Component({
      options: {
            addGlobalClass: true
      },

      externalClasses: ['custom-class'],

      properties: {
            info: null,
            name: String,
            size: String,
            color: String,
            block: {
                  type: Boolean,
                  value: false
            }
      },

      methods: {
            // 子组件向父组件传值
            onClick() {
                  this.triggerEvent('click');
            }
      }
});