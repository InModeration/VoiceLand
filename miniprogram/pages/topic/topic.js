//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
    comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
    more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
    camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776'
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    // var topic_data = util.topicDetail();
    // this.setData({
    //   mainuser: topic_data.mainuser,
    //   topic_content: topic_data.topic_content,
    //   topic_time: topic_data.topic_time,
    //   // comments: topic_data.comments,             
    //   like_num: topic_data.like_num,
    //   comment_num: topic_data.comment_num
    // });

    var topic_id = options.topic;
    wx.cloud.callFunction({
      name: "topic_detail",
      data: {
        topic_id: topic_id
      },
      success: res=>{
        // console.log(res);
        that.setData(
          res.result.list[0]
        )
      },
      fail: err=>{
        console.log(err);
      }
    })

    wx.cloud.callFunction({
      name: "topic_comment_user",
      data: {
            topic_id: topic_id
      },
      success: res=>{
        // console.log(res);
        // console.log('\n\n-------------------------------------------\n\n');
        // console.log(mergeReplies(res.result.list));

        var coms = res.result.list;
        coms = processTime(coms, 'comment_time');

        that.setData({
          comments: coms
        })
      },
      fail: err=>{
        console.log(err);
      }
    });
  },

  tapName: function(event){
    console.log(event)
  },

  moreReplies: function(e){
    wx.navigateTo({
      url: '../comment/comment',
    })
  }
})

// 取时间的年月日
function processTime(coms, key){
  for (var i=0; i < coms.length; i++){
    coms[i][key] = coms[i][key].substring(0,10);
  }
  return coms;
}

// 将同属于一个评论的回复合并到评论的replies字段中
// function mergeReplies(comments){
//   console.log(comments);
//   let new_comments = new Object();
//   let keys = [];
//   for (var i=0; i < comments.length; i++){
//     var new_obj = comments[i];
//     if (!(new_obj.comment_id in new_comments)){
//       // console.log(new_obj.comment_id);
//       let replies = [];

//       // 如果没有回复，则没有reply内部的任意一个字段
//       if ('like_num' in new_obj){
//         replies.push({
//           like_num: new_obj.like_num,
//           repliee: new_obj.repliee,
//           repliee_id: new_obj.repliee_id,
//           replier: new_obj.replier,
//           replier_id: new_obj.replier_id,
//           sort_key: new_obj.sort_key,
//           time: new_obj.time,
//           content: new_obj.content
//         });
//       }

//       new_comments[new_obj.comment_id] = {
//         avatar: new_obj.avatar,
//         name: new_obj.name,
//         main_user_id: new_obj.main_user_id,
//         comment_id: new_obj.comment_id,
//         comment_like_num: new_obj.comment_like_num,
//         comment_time: new_obj.comment_time,
//         comment_content: new_obj.comment_content,
//         replies: replies
//       };
//       keys.push(new_obj.comment_id);
//     }
//     else{
//       new_comments[new_obj.comment_id].replies.push(
//         {
//           like_num: new_obj.like_num,
//           repliee: new_obj.repliee,
//           repliee_id: new_obj.repliee_id,
//           replier: new_obj.replier,
//           replier_id: new_obj.replier_id,
//           sort_key: new_obj.sort_key,
//           time: new_obj.time,
//           content: new_obj.content
//         }
//       )
//     }
//   }
  
//   let returned_comments = []
//   for (var i=0; i < keys.length; i++){
//     returned_comments.push(new_comments[keys[i]]);
//   }
//   return returned_comments;
// }
