var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    //通知板块数据
    arrayMessage:[],
    arrayImageIsread:['/images/redRing.png',''],//是否已读标志
    arrayImageType:['/images/payCost.png','/images/inOut.png','/images/check.png'],//消息类型图片
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
  //点击消息
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
  },
  //长按删除
  longtapMessage:function(e){
    var that=this
    var messageID = this.data.arrayMessage[e.currentTarget.id]._id
    wx.showModal({
      title: '提示',
      content: '删除消息后无法恢复，确定删除？',
      confirmColor: '#E71111',
      cancelColor: '#E71111',
      success (res){
        if(res.confirm){
          //调用云函数删除消息
          wx.cloud.callFunction({
            name: 'deleteMessage',
            // 传给云函数的参数
            data: {
              messageID: messageID
            },
            success: function (res) {
              console.log('删除成功')
              that.onLoad()
            },
            fail: function (res) {
              console.log('删除失败')
            }
          })
        }else if(res.cancel){
          console.log('用户点击了取消')
        }
      }
    })
    
  }

})