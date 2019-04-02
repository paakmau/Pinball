// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  cloud.init()
  const db = wx.cloud.database()
  const pinballUserCollection = db.collection('pinball_user')

  event.openid
  event.mark
  return {
  }
}