var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    //个人信息
    name: '',
    nation: '',
    sexArray: ['男', '女'],
    sex: '',
    birthDay: '',
    birthPlace: '',
    arrayDangwei: ['软件学院党委', '计算机学院党委', '信息科学学院党委', '物理学院党委'],
    dangwei:'',
    academy: '',
    tele: '',
    position: '',
  },
  onLoad: function (options) {
    var that=this
    var adminID=app.globalData.user_number
    db.collection('admin').doc(adminID).get({
      success:function(res){
        that.setData({
          name:res.data.admin_name,
          nation: res.data.admin_nation,
          sex: res.data.admin_sex,
          birthDay: res.data.admin_birthDay,
          birthPlace: res.data.admin_birthPlace,
          dangwei: res.data.admin_dangWei,
          academy: res.data.admin_academy,
          tele: res.data.admin_telephone,
          position: res.data.admin_position,
        })
      }
    })
  },
  //性别picker
  changeSex:function(e){
    this.setData({
      sex:this.data.sexArray[e.detail.value]
    })
  },
  //生日picker
  changeBirthDay:function(e){
    this.setData({
      birthDay:e.detail.value
    })
  },
  //党委picker
  changeDangwei:function(e){
    this.setData({
      dangwei:this.data.arrayDangwei[e.detail.value]
    })
  },
  //表单提交
  formSubmit:function(e){
      var that=this
      let adminID=app.globalData.user_number
      let name=e.detail.value.name
      let nation=e.detail.value.nation
      let sex=that.data.sex
      let birthDay=that.data.birthDay
      let birthPlace=e.detail.value.birthPlace
      let dangwei=that.data.dangwei
      let academy=e.detail.value.academy
      let tele=e.detail.value.tele
      let position=e.detail.value.position
      if(name==''||nation==''||sex==''||birthDay==''||birthPlace==''||dangwei==''||academy==''||tele==''||position==''){
        wx.showToast({
          title: '需要填写全部信息',
          icon:"none",
          duration:1500
        })
      }else{
        db.collection('admin').doc(adminID).update({
          data: {
            admin_name: name,
            admin_nation: nation,
            admin_sex: sex,
            admin_birthDay: birthDay,
            admin_birthPlace: birthPlace,
            admin_dangWei:dangwei,
            admin_academy: academy,
            admin_telephone: tele,
            admin_position: position,
          },
          success: function (res) {
            console.log("修改成功")
            wx.showToast({
              title: '修改成功',
              icon:'none',
              duration:1500,
              complete:function(){
                wx.navigateBack({})
              }
            })
          }
        })
      }

  }

  
})