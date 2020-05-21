var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({


  data: {
    arrayInout:[],//未处理列表
    arrayPayed: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
  },

  onLoad: function (options) {
    var that=this
    db.collection('inOut').get({
      success:function(res){
        console.log(res.data)
        that.setData({
          arrayInout:res.data
        })
      }
    })
  },
  //待处理事件处理
  tapUntreatedInout:function(e){
    var inoutID=this.data.arrayInout[e.currentTarget.id]._id
    console.log(inoutID)
    wx.navigateTo({
      url: '/pages/manageMine/manageInout/inoutDeal/inoutDeal?inoutID=' + inoutID,
    })
  },
  onShow: function () {

  },

 
})