//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: ['/images/滑动窗/1.jpg', '/images/滑动窗/2.jpg','/images/滑动窗/3.jpg']
  },
  //入党申请书
  bandtapApplyParty:function(e){
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //缴纳党费
  bandtapPartyCost: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //思想报告
  bandtapReport: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //登记表
  bandtapCheck: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //投票
  bandtapVote: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //学习与考核
  bandtapTest: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //党费计算器
  bandtapCalculator: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //转入转出
  bandtapInOut: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  onLoad: function () {
  }
})
