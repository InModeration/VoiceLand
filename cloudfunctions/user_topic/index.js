/**
 * 本云函数用于获取用户发表的所有topic，用在personal页面
 */

 var topic_per_page = 5

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id, page} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  const $ = db.command.aggregate;

  return await db.collection('topic').aggregate()
  .match({
    mainuser_id: user_id
  })
  .sort({
    time: -1                        // 按时间倒序排列
  })
  .skip(page*topic_per_page)        // 通过跳过前面的内容和限制当前页数量达到分页效果
  .limit(topic_per_page)
  .lookup({
    from: "comment",
    localField: "_id",
    foreignField: "topic_id",
    as: "comments"
  })
  .project({
    comment_num: $.size('$comments'),
    content: 1,
    mainuser_id: 1,
    // time: $.dateToString({
    //   date: '$time',
    //   format: '%Y-%m-%dT%H:%M:%S.%LZ',
    //   timezone: "Asia/Shanghai"
    // }),
    year: $.year('$time'),
    month: $.month('$time'),
    day: $.dayOfMonth('$time'),
    like_num: $.size('$likes'),
    likes: 1,
    pictures: 1
  })
  .end({
    success:res=>{
      return res;
    },
    fail: err=>{
      return err;
    }
  })

}
