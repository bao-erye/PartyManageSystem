var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    user_number:'',

  },

  onLoad: function (options) {
    this.setData({
      user_number:app.globalData.user_number
    })
    console.log(this.data.user_number)
  },
  //表单提交
  submit:function(e){
    var that=this
    let number=that.data.user_number
    let reportTitle=e.detail.value.reportTitle
    let reportDetail=e.detail.value.reportDetail
    const _=db.command
    db.collection('user').doc(number).update({
      data:{
        user_report:_.push({ 
          user_reportTitle:reportTitle,
          user_reportDetail:reportDetail
        })
      },
      success:function(res){
        console.log(res.data)
      }

    })
  }

})