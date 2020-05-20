var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    arrayActivity:[]
  },

  onLoad: function (options) {
    var that=this
    var user_number=app.globalData.user_number
    var activity=[]
    //获取收藏对象
    db.collection('collect').where({
      collect_userID:user_number
    }).get({
      success:function(res){
        console.log(res.data)
        var j=0
        for (j; j < res.data.length; j++) {
          db.collection('activity').doc(res.data[j].collect_activityID).get({
            success: function (res) {
              activity.push(res.data)
              //设置活动对象数组
              that.setData({
                arrayActivity: activity
              })
            }
          })
        }
        console.log(arrayActivity)
      }
    })
  },
  //活动对象点击事件
  tapActivity: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/activity/activityDetail/activityDetail?activity_id=' + that.data.arrayActivity[e.currentTarget.id]._id,
    })
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    this.onLoad()
    
  },
  

})