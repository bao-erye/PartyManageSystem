Page({

  data: {
    //个人信息
    name:'王晨宝',
    nation:'汉族',
    sex:'男',
    birthDay:'1998年5月15日',
    birthPlace:'江西吉安',
    school:'南昌大学',
    academy:'软件学院',
    major:'软件工程',
    class:'软件工程168班',
    stuNumber:'8000116237',
    tele:'120219201',
    duty:'班长',
    award:'三等奖学金、一等奖学金',
    sexArray: ['男', '女'],
    sexIndex: 0,

  },

  onLoad: function (options) {

  },
  //选择性别
  changeSex: function (e) {
    this.setData({
      sex: this.data.sexArray[e.detail.value]
    })
  },
  //选择出生年月日
  changeBirthDay: function (e) {
    this.setData({
      birthDay: e.detail.value
    })
  },

})