Page({


  data: {
    title: "",
    date: "",
    place: "",
    object: "",
    belong: "",
    score: "",
    sum: "",
    affirmBegin: "",
    affirmEnd: "",
    signinBegin: "",
    signinEnd: "",
    activityBegin: "",
    activityEnd: "",
    detail: "",
    belongArray: ['软件学院', '计算机学院', '医学院', '信安学院'],
    objectArray: ['群众', '入党积极分子', '发展对象', '预备党员', '党员'],
  },

  onLoad: function (options) {

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

  //确认时间开始
  bindAffirmBegin: function (e) {
    this.setData({
      affirmBegin: e.detail.value
    })
  },
  //确认时间结束
  bindAffirmEnd: function (e) {
    this.setData({
      affirmEnd: e.detail.value
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
    console.log(e)
    this.setData({
      title: e.detail.value.title
    })
  }
})