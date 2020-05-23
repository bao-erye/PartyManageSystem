var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    inout_id:'',
    user_id:'',
    user_name: '',
    user_belong: '',
    gotoDangwei:'',
    gotoBranch:'',
    user_goto:'',
    user_date:'',
    reason: '',
    backColor:'#E71111',
    disabled:false,
  },

  onLoad: function (options) {
    var that=this
    var inoutID=options.inoutID
    var adminID=app.globalData.user_number
    that.setData({
      inout_id:inoutID
    })
    db.collection('inOut').doc(inoutID).get({
      success:function(res){
        that.setData({
          user_id:res.data.inOut_userID,
          user_name:res.data.inOut_userName,
          user_belong:res.data.inOut_userDangwei+res.data.inOut_userBranch,
          user_goto:res.data.inOut_gotoDangwei+res.data.inOut_gotoBranch,
          gotoDangwei:res.data.inOut_gotoDangwei,
          gotoBranch:res.data.inOut_gotoBranch,
          user_date:res.data.inOut_date,
          reason:res.data.inOut_reason
        })
        var i=0
        var array=res.data.inOut_affirm
        for(i;i<array.length;i++){
          if(array[i]==adminID){
            that.setData({
              backColor: '#837D7D',
              disabled:true
            })
          }
        }
      }
    })
  },
  //审核不通过
  tapNo:function(e){
    var that = this
    var inoutID = this.data.inout_id
    var adminID = app.globalData.user_number

    wx.cloud.callFunction({
      name: 'nopassInout',
      data: {
        id: inoutID,
        adminID: adminID
      },
      success: function (res) {
        console.log('转入转出更新成功')
        //查询是否是最终审核
        db.collection('inOut').doc(inoutID).get({
          success: function (res) {
            var affirm = res.data.inOut_affirm.length
            var pass = res.data.inOut_isPass
            console.log(affirm)
            if (affirm == 2) {
              console.log('最终审核不通过')
              //生成一条消息
              var userID = that.data.user_id
              //获取当前日期
              var year = new Date().getFullYear()
              var month = new Date().getMonth()
              var day = new Date().getDay()
              var nowTime = year + '-' + month + '-' + day
              db.collection('message').add({
                data: {
                  message_userID: userID,
                  message_type: 1,
                  message_date: nowTime,
                  message_content: '您的转入转出申请未能通过审核',
                  message_isRead: 0
                }, success: function (res) {
                  console.log('消息添加成功')
                  //返回上一页
                  wx.showToast({
                    title: '最终审核结束',
                    icon: 'none',
                    duration: 1500,
                    complete: function (e) {
                      wx.navigateBack({})
                    }
                  })
                }
              })

            } else {
              console.log('一方审核')
              wx.showToast({
                title: '单方审核不通过',
                icon: 'none',
                duration: 1500,
                complete: function (e) {
                  wx.navigateBack({})
                }
              })
            }
          }
        })

      },
      fail: function (res) {
        console.log('转入转出更新失败')
        wx.showToast({
          title: '更新状态失败，请稍后再试',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //审核通过
  tapYes:function(e){
    var that=this
    var inoutID = this.data.inout_id
    var adminID=app.globalData.user_number
    
    wx.cloud.callFunction({
      name: 'passInout', 
      data: {
        id:inoutID,
        adminID:adminID
      },
      success: function (res) {
        console.log('转入转出更新成功')
        //查询是否是最终审核，如是，更新用户所属支部信息
        db.collection('inOut').doc(inoutID).get({
          success:function(res){
            var affirm=res.data.inOut_affirm.length
            var pass=res.data.inOut_isPass
            console.log(affirm)
            if(affirm==2&&pass==2){
              console.log('最终审核成功')
              var userID = that.data.user_id
              var dangwei = that.data.gotoDangwei
              var branch = that.data.gotoBranch
              //全部审核通过，更新用户所属支部信息
              wx.cloud.callFunction({
                name:'updateUserBranch',
                data: {
                  userID:userID,
                  dangwei:dangwei,
                  branch:branch
                },success:function(res){
                  //成功更新用户支部信息
                  console.log('用户支部信息更新成功')
                  //生成一条消息
                  var userID=that.data.user_id
                  //获取当前日期
                  var year = new Date().getFullYear()
                  var month = new Date().getMonth()
                  var day = new Date().getDay()
                  var nowTime = year + '-' + month + '-' + day
                  db.collection('message').add({
                    data: {
                      message_userID: userID,
                      message_type: 1,
                      message_date: nowTime,
                      message_content: '您的转入转出申请通过审核',
                      message_isRead: 0
                    }, success: function (res) {
                      console.log('消息添加成功')
                      //返回上一页
                      wx.showToast({
                        title: '最终审核成功',
                        icon: 'none',
                        duration: 1500,
                        complete:function(e){
                          wx.navigateBack({})
                        }
                      })
                      
                    }
                  })

                },fail:function(res){
                  console.log('用户支部信息更新失败')
                }
              })
              
            }else{
              console.log('一方审核成功')
              wx.showToast({
                title: '单方审核成功',
                icon:'none',
                duration:1500,
                complete: function (e) {
                  wx.navigateBack({})
                }
              })
            }
          }
        })
        
      },
      fail: function (res) {
        console.log('转入转出更新失败')
        wx.showToast({
          title: '更新状态失败，请稍后再试',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }

})