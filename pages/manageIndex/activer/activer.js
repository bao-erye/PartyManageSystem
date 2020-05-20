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
    stuNumber: '',
    telenumber: '',
    position: '',
    award: '',
    family: '',
    society: '',
    applyHistory: '',
    work: '',
    punishment: '',
    score:98,
    arrayScore:[],
    arrayReport:[],//思想报告

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
          stuNumber: res.data._id,
          telenumber: res.data.user_telephone,
          position: res.data.user_position,
          award: res.data.user_award,
          family: res.data.user_family,
          society: res.data.user_society,
          applyHistory: res.data.user_applyHistory,
          work: res.data.user_work,
          punishment: res.data.user_punishment,
          score:res.data.user_scores[0],
          arrayReport:res.data.user_report,
        })
        //获取积分项
        var i = 0
        var arrayItem=[]
        var scoreItems = res.data.user_scores
        for (i = 0; i < scoreItems.length; i++) {
          if (i == 0) {
            continue;
          } else {
            arrayItem.push(scoreItems[i])
          }
        }
        that.setData({
          arrayScore: arrayItem
        })
      }
    })

  },
  //审核通过
  tapYes: function () {
    var userID = this.data.userID
    //获取当前日期
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDay()
    var nowTime = year + '-' + month + '-' + day
    wx.cloud.callFunction({
      name: 'updateStatus', // 云函数名称
      // 传给云函数的参数
      data: {
        userID: userID,
        status: 2
      },
      success: function (res) {
        console.log('更新成功')
        wx.showToast({
          title: '审核通过成功',
          icon: 'none',
          duration: 1500
        })
        //生成一条消息
        db.collection('message').add({
          data: {
            message_userID: userID,
            message_type: 2,
            message_date: nowTime,
            message_content: '恭喜你通过审核成为发展对象',
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
    //获取当前日期
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDay()
    var nowTime = year + '-' + month + '-' + day
    console.log(nowTime)
    //生成一条消息
    db.collection('message').add({
      data: {
        message_userID: userID,
        message_type: 2,
        message_date: nowTime,
        message_content: '很遗憾您未能通过发展对象审核，继续加油',
        message_isRead: 0
      }, success: function (res) {
        console.log('消息添加成功')
        //返回上一页
        wx.navigateBack({})
      }
    })
  }


})