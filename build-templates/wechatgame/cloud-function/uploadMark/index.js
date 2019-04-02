// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const userTable = db.collection('pinball_user')


// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve0, reject0) => {
  const openid = event.openid
  let maxMark = event.mark
  const topUserNum = event.topUserNum
  const radiusFront = event.radiusFront
  const radiusBack = event.radiusBack

  userTable.where({
    _openid: openid
  }).get().then(res=>{
    var nextStep = null
    if(res.data.length == 0){
      nextStep = userTable.add({
        data: {
          _openid: openid,
          mark: maxMark
        }
      })
    }else {
      maxMark = Math.max(maxMark, res.data[0].mark)
      nextStep = userTable.where({
        _openid: openid
      }).update({
        data: {
          mark: maxMark
        }
      })
    }
    nextStep.then(res => {
      userTable.orderBy("mark", "desc").get().then(res=>{
        const users = res.data
        let rank = 0
        for(let i=0; i<users.length; i++) {
          if(users[i]._openid == openid)
            break
          rank++
        }
        if(topUserNum < rank-radiusFront)
          resolve0({
            maxMark: maxMark,
            topUsers: users.slice(0, topUserNum),
            nearUsers: users.slice(rank-radiusFront, Math.min(rank+radiusBack+1, users.length)),
            nearFrontRank: rank-radiusFront+1,
            rank: rank+1
          })
        else
          resolve0({
            maxMark: maxMark,
            topUsers: users.slice(0, Math.min(topUserNum+2, users.length)),
            nearUsers: [],
            nearFrontRank: -1,
            rank: rank+1
          })
      })
    })
  })
})