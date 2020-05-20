var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    arrayActivity:[]
  },

  onLoad: function (options) {
    var that =this
    var user_number=app.globalData.user_number
    var myActivity=[]
    db.collection('activity').where({
      activity_affirmed:user_number,
      activity_signined:user_number
    }).get({
      success:function(res){
        var i=0
        for(i;i<res.data.length;i++){
          myActivity.push(res.data[i])
        }
        console.log(myActivity)
      }
    })
    const _=db.command
    db.collection('activity').where(_.and([
      {
        activity_affirmed:_.in([user_number])
      },
      {
        activity_signined:_.nin([user_number])
      }
      ])).get({
      success:function(res){
        var j=0
        for(j;j<res.data.length;j++){
          myActivity.push(res.data[j])
        }
        console.log(myActivity)
        that.setData({
          arrayActivity: myActivity
        })
      }
    })

  },
  tapActivity: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/activity/activityDetail/activityDetail?activity_id=' + that.data.arrayActivity[e.currentTarget.id]._id,
    })
  }

})