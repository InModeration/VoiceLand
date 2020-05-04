// 路由相关的函数


/**
 * 获取上一页面
 */
function getPrePage () {
      let page = getCurrentPages()
      let prePage = page.slice(-1)
      return prePage
}

/**
 * 跳转至某一用户的主页
 * curr_id 当前用户的id
 * user_ud 访问的用户id
 */
function toPersonal (curr_id, user_id) {
      wx.navigateTo({
            url: '/pages/personal/personal?user=' + user_id + '&curUser=' + curr_id,
      })
}

module.exports.toPersonal = toPersonal