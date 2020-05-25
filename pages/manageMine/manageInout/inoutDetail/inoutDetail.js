var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    inout_id: '',
    user_name: '',
    user_belong: '',
    user_goto: '',
    user_date: '',
    reason: '',
    isPass:0,//审核结果
  },

  onLoad: function (options) {
    var that = this
    var inoutID = options.inoutID
    console.log(inoutID)
    that.setData({
      inout_id: inoutID
    })
    db.collection('inOut').doc(inoutID).get({
      success: function (res) {
        that.setData({
          user_name: res.data.inOut_userName,
          user_belong: res.data.inOut_userDangwei + res.data.inOut_userBranch,
          user_goto: res.data.inOut_gotoDangwei + res.data.inOut_gotoBranch,
          user_date: res.data.inOut_date,
          reason: res.data.inOut_reason,
          isPass:res.data.inOut_isPass
        })
      }
    })
  }


})