
Page({

  data: {
    //个人信息
    name: '王晨宝',
    nation: '汉族',
    sex: '男',
    birthDay: '2020-10-10',
    birthPlace: '江西吉安',
    school: '南昌大学',
    academy: '软件学院',
    major: '软件工程',
    stuClass: '软件工程168班',
    stuNumber: '8000116237',
    tele: '120219201',
    position: '班长',
    award: '三等奖学金、一等奖学金',
    sexArray: ['男', '女'],//性别picker
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