var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    //通知板块数据
    arrayMessage:[],
    arrayImageIsread:['/images/红圈.png',''],//是否已读标志
    arrayImageType:['/images/缴费.png','/images/转入转出.png','/images/审核.png'],//消息类型图片
    arrayTextType:['党费通知','转入转出通知','审核通知'],//消息类型文本
  },
  onLoad: function (options) {
    var that=this
    var user_number = app.globalData.user_number
    db.collection('message').where({
      message_userID:user_number
    }).get({
      success:function(res){
        that.setData({
          arrayMessage:res.data
        })
      }
    })

  },
  tapMessage:function(e){
    var that=this
    var message=that.data.arrayMessage[e.currentTarget.id]
    var user_number=app.globalData.user_number
    wx.showModal({
      title: that.data.arrayTextType[message.message_type],
      content: message.message_content,
      confirmColor: '#E71111',
      cancelColor:'#E71111',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'updateMessage', // 云函数名称
            // 传给云函数的参数
            data: {
              id: message._id
            },
            success: function (res) {
              console.log('更新成功')
              db.collection('message').where({
                message_userID: user_number
              }).get({
                success: function (res) {
                  that.setData({
                    arrayMessage: res.data
                  })
                }
              })
            },
            fail: function(res){
              console.log('更新失败')
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.cloud.callFunction({
            name: 'updateMessage', // 云函数名称
            // 传给云函数的参数
            data: {
              id: message._id
            },
            success: function (res) {
              console.log('更新成功')
              db.collection('message').where({
                message_userID: user_number
              }).get({
                success: function (res) {
                  that.setData({
                    arrayMessage: res.data
                  })
                }
              })
            },
            fail: function (res) {
              console.log('更新失败')
            }
          })
        }
      }
    })
  }

})