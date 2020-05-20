//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    activity_id:'',
    title: "",
    date: "",
    place: "",
    object: "",
    belong: "",
    score: "",
    sum: "",
    affirmDateBegin: "",
    affirmTimeBegin: '',
    affirmDateEnd: '',
    affirmTimeEnd: "",
    signinBegin: "",
    signinEnd: "",
    activityBegin: "",
    activityEnd: "",
    detail: "",
    belongArray: ['软件学院', '计算机学院', '医学院', '信安学院'],
    objectArray: ['群众', '入党积极分子', '发展对象', '预备党员', '党员'],
  },

  onLoad: function (options) {
    var that=this
    var activityID = options.activity_id
    console.log(activityID)
    that.setData({
      activity_id:activityID
    })
    db.collection('activity').doc(activityID).get({
      success:function(res){
        that.setData({
          title: res.data.activity_title,
          date: res.data.activity_date,
          place: res.data.activity_place,
          object: res.data.activity_object,
          belong: res.data.activity_issuer,
          score: res.data.activity_score,
          sum: res.data.activity_sum,
          affirmDateBegin: res.data.activity_affirmDateBegin,
          affirmTimeBegin: res.data.activity_affirmTimeBegin,
          affirmDateEnd: res.data.activity_affirmDateEnd,
          affirmTimeEnd: res.data.activity_affirmTimeEnd,
          signinBegin: res.data.activity_signinBegin,
          signinEnd: res.data.activity_signinEnd,
          activityBegin: res.data.activity_begin,
          activityEnd: res.data.activity_end,
          detail: res.data.activity_detail,
        })
      }
    })

  },
  //日期选择器
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //对象选择器
  changeObject: function (e) {
    this.setData({
      object: this.data.objectArray[e.detail.value]
    })
  },
  //组织选择器
  changeBelong: function (e) {
    this.setData({
      belong: this.data.belongArray[e.detail.value]
    })
  },
  //确认日期开始
  bindAffirmDateBegin: function (e) {
    this.setData({
      affirmDateBegin: e.detail.value
    })
  },
  //确认时间开始
  bindAffirmTimeBegin: function (e) {
    this.setData({
      affirmTimeBegin: e.detail.value
    })
  },
  //确认日期结束
  bindAffirmDateEnd: function (e) {
    this.setData({
      affirmDateEnd: e.detail.value
    })
  },
  //确认时间结束
  bindAffirmTimeEnd: function (e) {
    this.setData({
      affirmTimeEnd: e.detail.value
    })
  },
  bindSigninBegin: function (e) {
    this.setData({
      signinBegin: e.detail.value
    })
  },
  bindSigninEnd: function (e) {
    this.setData({
      signinEnd: e.detail.value
    })
  },
  bindActivityBegin: function (e) {
    this.setData({
      activityBegin: e.detail.value
    })
  },
  bindActivityEnd: function (e) {
    this.setData({
      activityEnd: e.detail.value
    })
  },
  //点击添加图片事件
  tapAddImage: function (e) {

  },
  //提交表单
  formSubmit: function (e) {
    var activityID=this.data.activity_id
    let title = e.detail.value.title
    let date = this.data.date
    let place = e.detail.value.place
    let object = this.data.object
    let belong = this.data.belong
    let score = e.detail.value.score
    let sum = e.detail.value.sum
    let affirmDateBegin = this.data.affirmDateBegin
    let affirmTimeBegin = this.data.affirmTimeBegin
    let affirmDateEnd = this.data.affirmDateEnd
    let affirmTimeEnd = this.data.affirmTimeEnd
    let signinBegin = this.data.signinBegin
    let signinEnd = this.data.signinEnd
    let activityBegin = this.data.activityBegin
    let activityEnd = this.data.activityEnd
    let detail = e.detail.value.detail
    db.collection('activity').doc(activityID).update({
      data: {
        activity_title: title,
        activity_date: date,
        activity_place: place,
        activity_object: object,
        activity_issuer: belong,
        activity_score: score,
        activity_sum: sum,
        activity_affirmDateBegin: affirmDateBegin,
        activity_affirmTimeBegin: affirmTimeBegin,
        activity_affirmDateEnd: affirmDateEnd,
        activity_affirmTimeEnd: affirmTimeEnd,
        activity_signinBegin: signinBegin,
        activity_signinEnd: signinEnd,
        activity_begin: activityBegin,
        activity_end: activityEnd,
        activity_detail: detail
      }, success: function (res) {
        console.log('成功修改活动')
        wx.showToast({
          title: '成功修改活动',
          icon: 'none',
          duration: 1500
        })
        wx.navigateBack({})
      }
    })
  }
})