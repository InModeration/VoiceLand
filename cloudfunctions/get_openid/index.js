// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

const appid = 'wxf5705ecfb5a86f44'
const appsecret = '7c8fdf335041b5b5d5538373af9d565d'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { userInfo, code} = event;

  var option ={
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`,
    method: "GET",
    json: true,
    headers: {
        "content-type": "application/json",
    }
  }

  return await rp(option)
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return err
    });
}
