// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: "party-test-3q2zh" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  var user_id = event.userID
  var dangwei = event.dangwei
  var branch=event.branch
  return await db.collection('user').doc(user_id).update({
    data: {
      user_dangWei:dangwei,
      user_partyBranch:branch
    }
  })

}