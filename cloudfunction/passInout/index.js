// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: "party-test-3q2zh" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  var inout_id = event.id
  var adminID=event.adminID
  const _=db.command
  return await db.collection('inOut').doc(inout_id).update({
    data: {
      inOut_affirm:_.push(adminID),
      inOut_isPass:_.inc(1)
    }
  })

}