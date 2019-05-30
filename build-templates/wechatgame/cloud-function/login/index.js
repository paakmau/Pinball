// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const userTable = db.collection('pinball_user')

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve0, reject0) => {
  const wxContext = cloud.getWXContext()
  const nickName = (event.nickName != null) ? event.nickName : "匿名用户"
  const openid = wxContext.OPENID

  userTable.where({
    _openid: openid
  }).get().then(res => {
    var nextStep = null
    if (res.data.length == 0) {
      nextStep = userTable.add({
        data: {
          _openid: openid,
          nickName: nickName
        }
      })
    } else {
      nextStep = userTable.where({
        _openid: openid
      }).update({
        data: {
          nickName: nickName
        }
      })
    }
    nextStep.then(res => {
      resolve0({
        openid: openid
      })
    })
  })
})