
var app = getApp();//获取应用实例
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })

Page({
  data: {

    textContent:'',//textarea输入内容
    user_number:null,
  },
  //textarea失去焦点触发
  textChange:function(e){
    this.setData({textContent:e.detail.value});
  },
  //提交按钮
  submit:function(){
    var user_number = this.data.user_number //获取用户ID
    var text = this.data.textContent  //获取输入内容
    console.log(text)
    db.collection('user').doc(user_number).update({
      data: {
        user_application: text
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  onLaunch: function () {
  },

  onLoad: function (options) {
    this.setData({
        user_number:app.globalData.user_number
    })
  },
})
