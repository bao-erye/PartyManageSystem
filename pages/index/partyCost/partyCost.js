var app = getApp()//获取应用实例
wx.cloud.init({ env: "party-test-3q2zh" })//获取云数据库实例
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {

    partyCost: 0,//应交党费
    arrayCost:[],//缴费记录
    arrayIspayed:['未缴纳','已缴纳']

  },
  onLoad: function (options) {
    var that =this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    console.log(parseInt(M))
    //查询缴费记录
    let user_number=app.globalData.user_number
    db.collection('charge').where({
      charge_userID:user_number
    }).orderBy('month','asc').get({
      success:function(res){
        console.log(res.data)
        that.setData({
          arrayCost:res.data
        })
      }
    })
    db.collection('charge').where({
      charge_userID:user_number,
      charge_month:parseInt(M),
      charge_isPayed:0
    }).get({
      success:function(res){
        console.log(res.data[0].charge_account)
        that.setData({
          partyCost: res.data[0].charge_account//设置党费
        })
      }
    })
  },
  //支付按钮
  bindtapPay: function (e) {

  },

  
})