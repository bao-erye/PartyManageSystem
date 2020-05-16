var app=getApp()
wx.cloud.init({env:"party-test-3q2zh"})
const db = wx.cloud.database({env: "party-test-3q2zh"})
Page({

  data: {
    number:'',
    password:'',
    arrayIdentity:['我是学生','我是管理员'],
    identity:'我是学生'
  },

  onLoad: function (options) {


  },
  //身份选择器
  changeIndex:function(e){
    this.setData({
      identity:this.data.arrayIdentity[e.detail.value]
    })
  },
  //登录按钮
  tapLogin:function(e){
    var number=this.data.number
    var password=this.data.password
    if(number==''){
      wx.showToast({
        title: '学号不能为空',
        icon:'none',
        duration:1500,
      })
    }else if(password==''){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500,
      })
    }else{
      if(this.data.identity=='我是学生'){
        db.collection('user').doc(number).get({
          success: function (res) {
            if (password == res.data.user_password) {
              //设置全局变量中user_number
              app.globalData.user_number=number
              console.log(app.globalData.user_number)
              wx.switchTab({
                url: '/pages/index/index/index',
              })
            }else{
              wx.showToast({
                title: '账号密码不匹配',
                icon:'none',
                duration:1500
              })
            }
          }
        })
      }else if(this.data.identity=='我是管理员'){
        db.collection('admin').doc(number).get({
          success: function (res) {
            if (password == res.data.admin_password) {
              //设置全局变量中user_number
              app.globalData.user_number = number
              console.log(app.globalData.user_number)
              wx.redirectTo({
                url: '/pages/manageIndex/manageIndex/manageIndex',
              })
            }else{
              wx.showToast({
                title: '账号密码不匹配',
                icon: 'none',
                duration: 1500
              })
            }
          }
        })
      }else{

      }
      
    }
  },
  //学号输入失去焦点
  blurNumber:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  //密码输入失去焦点
  blurPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  //注册
  tapRegister:function(){
    wx.navigateTo({
      url: '/pages/login/register/register',
    })
  },
})