var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    mineImageUrl:'/images/userMine/icon.png',
    mineName:'',
    mineSchool:'',
    mineAcademy:'',
    mineMajor:'',
    mineStatus:'',
    arrayStatus:['群众','入党积极分子','发展对象','预备党员','党员'],
  },
  onLoad: function (options) {
    var that=this
    var user_number=app.globalData.user_number
    db.collection('user').doc(user_number).get({
      success:function(res){
        that.setData({
          mineName:res.data.user_name,
          mineSchool:res.data.user_school,
          mineAcademy:res.data.user_dangWei,
          mineMajor:res.data.user_partyBranch,
          mineStatus:that.data.arrayStatus[res.data.user_status]
        })
      }
    })
  },
  //个人资料
  tapData:function(e){
    wx.navigateTo({
      url: '/pages/mine/personalData/personalData',
    })
  },
  //我的积分
  tapScore:function(e){
    wx.navigateTo({
      url: '/pages/mine/score/score',
    })
  },
  //我的考核
  tapExam:function(e){
    wx.navigateTo({
      url: '/pages/mine/exam/exam',
    })
  },
  //我的活动
  tapActivity:function(e){
    wx.navigateTo({
      url: '/pages/mine/myActivity/myActivity',
    })
  },
  //我的收藏
  tapCollect:function(e){
    wx.navigateTo({
      url: '/pages/mine/myActivity/myActivity',
    })
  },
  //退出
  tapExit:function(e){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }


})