//获取应用实例
var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    user_number:'',

  },

  onLoad: function (options) {
    //获取用户ID
    this.setData({
      user_number:app.globalData.user_number
    })

  },
  //提交按钮点击事件
  formSubmit: function (e) {
    var that=this
    let user_number=that.data.user_number
    let name=e.detail.value.name
    let graduate=e.detail.value.graduate
    let education=e.detail.value.education
    let job=e.detail.value.job
    let jobTime=e.detail.value.jobTime
    let speciality=e.detail.value.speciality
    let family=e.detail.value.family
    let society=e.detail.value.society
    let applyHistory=e.detail.value.applyHistory
    let work=e.detail.value.work
    let award=e.detail.value.award
    let punishment=e.detail.value.punishment
    //提交信息
    db.collection('user').doc(user_number).update({
      data:{
        user_graduate:graduate,
        user_education:education,
        user_job:job,
        user_jobTime:jobTime,
        user_speciality:speciality,
        user_family:family,
        user_society:society,
        user_applyHistory:applyHistory,
        user_work:work,
        user_award:award,
        user_punishment:punishment
      },success:function(res){
        console.log(res.data)
      }
    })
  },

})