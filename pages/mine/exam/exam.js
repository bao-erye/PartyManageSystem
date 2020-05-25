var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    userImgUrl: '/images/userMine/icon.png',
    userName: '',
    userClass: '',
    userStuNumber: '',
    arrayExam: [],
  },

  onLoad: function (options) {
    var that = this
    var user_number = app.globalData.user_number
    db.collection('user').doc(user_number).get({
      success: function (res) {
        that.setData({
          userName: res.data.user_name,
          userClass: res.data.user_class,
          userStuNumber: res.data._id,
          arrayExam:res.data.user_exam
        })
        
      }
    })
  },

})