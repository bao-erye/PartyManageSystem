//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    userID: '',
    name: '',
    nation: '',
    sex: '',
    birthPlace: '',
    birthDay: '',
    school: '',
    academy: '',
    major: '',
    stuClass: '',
    number: '',
    telenumber: '',
    position: '',
    award: '',
    prepareExam:''
  },


  onLoad: function (options) {
    var that = this
    var user_id = options.userID
    this.setData({
      userID: user_id
    })
    db.collection('user').doc(user_id).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          name: res.data.user_name,
          nation: res.data.user_nation,
          sex: res.data.user_sex,
          birthPlace: res.data.user_birthPlace,
          birthDay: res.data.user_birthDay,
          school: res.data.user_school,
          academy: res.data.user_academy,
          major: res.data.user_major,
          stuClass: res.data.user_class,
          number: res.data._id,
          telenumber: res.data.user_telephone,
          position: res.data.user_position,
          award: res.data.user_award,
        })
        
      }
    })
  },
  //审核通过
  tapYes: function () {
    var userID = this.data.userID
    var preExam = this.data.prepareExam
    console.log(preExam)
    //获取当前日期
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDay()
    var nowTime = year + '-' + month + '-' + day
    wx.cloud.callFunction({
      name: 'updateReadyTest', // 云函数名称
      // 传给云函数的参数
      data: {
        userID: userID,
        status: 4,
        preExam: preExam
      },
      success: function (res) {
        console.log('更新成功')
        wx.showToast({
          title: '审核通过成功',
          icon: 'none',
          duration: 2000
        })
        //生成一条消息
        db.collection('message').add({
          data: {
            message_userID: userID,
            message_type: 2,
            message_date: nowTime,
            message_content: '恭喜你通过审核成为正式党员',
            message_isRead: 0
          }, success: function (res) {
            console.log('消息添加成功')
            //返回上一页
            wx.navigateBack({})
          }
        })

      },
      fail: function (res) {
        console.log('更新失败')
        wx.showToast({
          title: '更新状态失败，请稍后再试',
          icon: 'none',
          duration: 1500
        })
        //返回上一页
        wx.navigateBack({})
      }
    })
  },
  //审核不通过
  tapNo: function () {
    var userID = this.data.userID
    var preExam = this.data.prepareExam
    //获取当前日期
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDay()
    var nowTime = year + '-' + month + '-' + day
    console.log(nowTime)
    wx.cloud.callFunction({
      name: 'updateReadyTest', // 云函数名称
      // 传给云函数的参数
      data: {
        userID: userID,
        status: 3,
        preExam: preExam
      },
      success: function (res) {
        console.log('更新成功')
        //生成一条消息
        db.collection('message').add({
          data: {
            message_userID: userID,
            message_type: 2,
            message_date: nowTime,
            message_content: '您未能通过正式党员审核，继续加油',
            message_isRead: 0
          }, success: function (res) {
            console.log('消息添加成功')
            //返回上一页
            wx.navigateBack({})
          }
        })

      }, fail: function (res) {
        console.log('更新失败')
        wx.showToast({
          title: '更新状态失败，请稍后再试',
          icon: 'none',
          duration: 1500
        })
        //返回上一页
        wx.navigateBack({})
      }
    })
  },
  //预备期考察结果输入失焦
  blurReadyTest:function(e){
    this.setData({
      prepareExam:e.detail.value
    })
  }


})