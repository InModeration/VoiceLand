var user_url = "https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/data/user.json?sign=f2e1e2f700847227800187fd39c0d6a4&t=1588147629";

function loadJson(json_url, page){
    wx.request({
      url: json_url,//json数据地址
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list_data的这个数组中
        page.setData({
          list_data: res.data.imgListData,
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
      },
      fail: res=>{
          console.log(res);
      }
    });
}