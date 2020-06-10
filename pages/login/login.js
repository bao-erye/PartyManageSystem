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
    var that=this
    //获取本地缓存
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res.data)
        that.setData({
          number:res.data.ID,
          password:res.data.psd
        })
      },
    })
  },
  //身份选择器
  changeIndex:function(e){
    var that=this
    this.setData({
      identity:this.data.arrayIdentity[e.detail.value]
    })
    var identity=this.data.identity
    if(identity=='我是学生'){
      //获取本地缓存
      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.data)
          that.setData({
            number: res.data.ID,
            password: res.data.psd
          })
        },
      })
    }else if(identity=='我是管理员'){
      //获取本地缓存
      wx.getStorage({
        key: 'admin',
        success: function (res) {
          console.log(res.data)
          that.setData({
            number: res.data.ID,
            password: res.data.psd
          })
        },
      })

    }
  },
  //登录按钮
  tapLogin:function(e){
    var that=this
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
              //本地缓存
              wx.setStorage({
                key: 'user',
                data: {ID:number,psd:res.data.user_password},
                success:function(){
                  console.log('用户账号密码存入本地缓存')
                }
              })
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
          },fail:function(res){
            console.log('用户不存在')
            wx.showToast({
              title: '用户不存在',
              icon: 'none',
              duration: 1500
            })
          }
        })
      }else if(this.data.identity=='我是管理员'){
        db.collection('admin').doc(number).get({
          success: function (res) {
            if (password == res.data.admin_password) {
              //本地缓存
              wx.setStorage({
                key: 'admin',
                data: { ID: number, psd: res.data.admin_password },
                success: function () {
                  console.log('管理员账号密码存入本地缓存')
                }
              })
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
          },fail:function(res){
            wx.showToast({
              title: '用户不存在',
              icon: 'none',
              duration: 1500
            })
          }
        })
      }else{

      }
      
    }
  },
  //学号输入失去焦点
  inputNumber:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  //密码输入失去焦点
  inputPsd:function(e){
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