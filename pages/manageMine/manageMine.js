var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    mineImageUrl: '/images/userMine/icon.png',
    mineName: '',
    mineDangwei: '',
    mineBranch: '',
  },

  onLoad: function (options) {
    var that=this
    var admin_id=app.globalData.user_number
    db.collection('admin').doc(admin_id).get({
      success:function(res){
        that.setData({
          mineName:res.data.admin_name,
          mineDangwei:res.data.admin_dangWei,
          mineBranch:res.data.admin_branch
        })
      }
    })
  },
  //个人资料
  tapPersonalData:function(e){
    wx.navigateTo({
      url: '/pages/manageMine/personalData/personalData',
    })
  },
  //党支部管理
  tapPartyManage:function(e){
    wx.navigateTo({
      url: '/pages/manageMine/partyManage/partyManage',
    })
  },
  //转入转出管理
  tapInoutManage:function(e){
    var adminBranch = this.data.mineBranch
    wx.navigateTo({
      url: '/pages/manageMine/manageInout/manageInout?adminBranch='+adminBranch,
    })
  },
  //党费缴纳情况
  tapPartyCharge:function(e){
    wx.navigateTo({
      url: '/pages/manageMine/payStatistic/payStatistic',
    })
  },
  //退出
  tapExit: function (e) {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
})