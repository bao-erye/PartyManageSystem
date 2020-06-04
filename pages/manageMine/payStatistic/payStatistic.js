var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    //picker
    arrayYear:[2015,2016,2017,2018,2019,2020],
    year:'选择年份',
    arrayMonth:[1,2,3,4,5,6,7,8,9,10,11,12],
    month:'选择月份',
    //缴纳名单
    arrayPayed: [],
    //未缴纳名单
    arrayNopay: [],
  },

  onLoad: function (options) {
    var that=this
    //获取已缴纳记录
    db.collection('charge').where({
      charge_isPayed: 1
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          arrayPayed:res.data
        })
      }
    })
    //获取未缴纳记录
    db.collection('charge').where({
      charge_isPayed: 0
    }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          arrayNopay: res.data
        })
      }
    })
  },
  //年份picker
  changeYear:function(e){
    var that=this
    that.setData({
      year:that.data.arrayYear[e.detail.value]
    })
    var year=that.data.year
    //获取已缴纳
    db.collection('charge').where({
      charge_year:year,
      charge_isPayed:1
    }).get({
      success:function(res){
        that.setData({
          arrayPayed:res.data
        })
      }
    })
    //获取未缴纳
    db.collection('charge').where({
      charge_year: year,
      charge_isPayed: 0
    }).get({
      success: function (res) {
        that.setData({
          arrayNopay: res.data
        })
      }
    })
  },
  //月份picker
  changeMonth: function (e) {
    var that = this
    that.setData({
      month: that.data.arrayMonth[e.detail.value]
    })
    var month = that.data.month
    //获取已缴纳
    db.collection('charge').where({
      charge_month: month,
      charge_isPayed: 1
    }).get({
      success: function (res) {
        that.setData({
          arrayPayed: res.data
        })
      }
    })
    //获取未缴纳
    db.collection('charge').where({
      charge_month: month,
      charge_isPayed: 0
    }).get({
      success: function (res) {
        that.setData({
          arrayNopay: res.data
        })
      }
    })
  },


 
})