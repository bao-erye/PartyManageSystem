wx.cloud.init({
  env: "party-test-3q2zh"
})
const db = wx.cloud.database({
  env: "party-test-3q2zh"
})
Page({


  data: {
    sex: '',
    sexArray: ['男', '女'],
    sexIndex: 0,
    birthDay:''
    
  },

  onLoad: function (options) {

  },
  //选择性别
  changeSex:function(e){
    this.setData({
      sex:this.data.sexArray[e.detail.value]
    })
  },
  //选择出生年月日
  changeBirthDay:function(e){
    this.setData({
      birthDay:e.detail.value
    })
  },
  //注册按钮
  formSubmit:function(e){
    let stuNumber = e.detail.value.stuNumber
    let name = e.detail.value.name
    let password = e.detail.value.password
    let confirmPsd=e.detail.value.confirmPsd
    let nation = e.detail.value.nation
    let sex = this.data.sexArray[e.detail.value.sex]
    let birthDay = e.detail.value.birthDay
    let birthPlace = e.detail.value.birthPlace
    let academy = e.detail.value.academy
    let major = e.detail.value.major
    let stuClass = e.detail.value.stuClass
    let tele = e.detail.value.tele
    let position = e.detail.value.position
    let score=[0]
    if(stuNumber==''){
      wx.showToast({
        title: '学号不能为空',
        icon:'none',
        duration:1500
      })
    }else if(name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1500
      })
    }else if(password==''||confirmPsd==''){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
    }else if(password.length<6||confirmPsd<6){
      wx.showToast({
        title: '密码字符数不少于6',
        icon: 'none',
        duration: 1500
      })
    }else if (password != confirmPsd) {
      wx.showToast({
        title: '两次密码输入不同',
        icon: 'none',
        duration: 1500
      })
    }else{
      db.collection('user').add({
        data: {
          _id: stuNumber,
          user_password: password,
          user_name: name,
          user_status:0,
          user_nation: nation,
          user_sex: sex,
          user_birthDate: birthDay,
          user_birthPlace: birthPlace,
          user_academy: academy,
          user_major: major,
          user_class: stuClass,
          user_telephone: tele,
          user_position: position,
          user_scores: score
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
    
  }
})