module.exports = {}

function addTopic(user_id, content, pictures){
  var data = {
    main_user_id: user_id,
    content: content,
    pictures: pictures
  };
  
  wx.cloud.callFunction({
    name: "add_topic",
    data: {
      data: data
    },
    success: res=>{
      console.log(res);
      return 1;
    },
    fail: err=>{
      console.log(err);
      return 0;
    }
  });
}

module.exports.addTopic = addTopic;