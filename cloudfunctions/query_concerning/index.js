// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, user_id} = event;
  const db = cloud.database({
    env:'voice-land-qcrwm'
  });

  const $ = db.command.aggregate;

  return await db.collection('user').aggregate()
  .match({
    _id: user_id
  })
  .project({
    concern_id: '$concern'
  })
  .unwind({
    path: '$concern_id',
    preserveNullAndEmptyArrays: true
  })
  .lookup({
    from: "user",
    localField: 'conern_id',
    foreignField: "_id",
    as: "conern"
  })
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$concern', 0]), '$$ROOT' ])
  })
  // .project({
  //   _id: '$concern_id',
  //   name: 1,
  //   avatar: 1,
  //   motto: 1
  // })
  .end({
    success:res=>{
      return res;
    },
    fail: err=>{
      return err;
    }
  })

}