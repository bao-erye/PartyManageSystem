//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    arrayLearn: [],
    arrayTest:[]

  },
  onLoad: function (options) {
    var that=this
    //获取学习列表
    db.collection('study').get({
      success:function(res){
        that.setData({
          arrayLearn:res.data
        })
      }
    })
    //获取考核列表
    db.collection('exam').get({
      success:function(res){
        that.setData({
          arrayTest:res.data
        })
      }
    })
  },
  onShow:function(e){
    this.onLoad()
  },
  //添加学习内容
  tapAddLearn:function(e){
    wx.navigateTo({
      url: '/pages/manageLearn/addLearn/addLearn',
    })

  },
  //添加考核内容
  tapAddTest:function(e){
    wx.navigateTo({
      url: '/pages/manageLearn/addTest/addTest',
    })
  },
  //学习列表点击事件
  tapLearn: function (e) {
    let study_id=this.data.arrayLearn[e.currentTarget.id]._id
    console.log(study_id)
    wx.navigateTo({
      url: '/pages/manageLearn/editLearn/editLearn?studyID=' + study_id,
    })
  },
})