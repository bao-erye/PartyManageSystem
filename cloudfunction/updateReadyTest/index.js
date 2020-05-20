// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: "party-test-3q2zh" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  var user_id = event.userID
  var userStatus = event.status
  var userPreExam = event.preExam
  return await db.collection('user').doc(user_id).update({
    data: {
      user_status: userStatus,
      user_prepareExam: userPreExam
    }
  })

}