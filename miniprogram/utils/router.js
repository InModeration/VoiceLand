// 路由相关的函数


/**
 * 获取上一页面
 */
function getPrePage () {
      let page = getCurrentPages()
      let prePage = page.slice(-1)
      return prePage
}