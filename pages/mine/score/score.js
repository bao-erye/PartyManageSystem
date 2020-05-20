var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    userImgUrl:'/images/我的/头像.png',
    userName:'',
    userClass:'',
    userStuNumber:'',
    score:0,
    arrayScore:[],
  },

  onLoad: function (options) {
    var that=this
    var user_number=app.globalData.user_number
    db.collection('user').doc(user_number).get({
      success:function(res){
        that.setData({
          userName:res.data.user_name,
          userClass:res.data.user_class,
          userStuNumber:res.data._id,
          score:res.data.user_scores[0],
        })
        var i=0
        var arrayItem=that.data.arrayScore
        var scoreItems = res.data.user_scores
        console.log(scoreItems)
        for (i = 0; i < scoreItems.length;i++){
          if(i==0){
            continue;
          }else{
            arrayItem.push(scoreItems[i])
          }
        }
        that.setData({
          arrayScore:arrayItem
        })
      }
    })
  },

})