
Page({


  data: {
    //个人信息
    sex: '',
    birthDay: '',
    sexArray: ['男', '女'],
  },

  onLoad: function (options) {

  },

  //出生年月日picker
  changeBirthDay: function (e) {
    this.setData({
      birthDay: e.detail.value
    })
  },
  //性别picker
  changeSex: function (e) {
    this.setData({
      sex: this.data.sexArray[e.detail.value]
    })
  },
  //表单提交
  formSubmit: function (e) {
    this.setData({
      name: e.detail.value.name,
      nation: e.detail.value.nation,
      sex: this.data.sexArray[e.detail.value.sex],
      birthDay: e.detail.value.birthDay,
      birthPlace: e.detail.value.birthPlace,
      school: e.detail.value.school,
      academy: e.detail.value.academy,
      major: e.detail.value.major,
      stuClass: e.detail.value.stuClass,
      stuNumber: e.detail.value.stuNumber,
      tele: e.detail.value.tele,
      position: e.detail.value.position,
      award: e.detail.value.award
    })
  }


})