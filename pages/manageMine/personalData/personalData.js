wx.cloud.init({
  env: "party-test-3q2zh"
})
const db = wx.cloud.database({
  env: "party-test-3q2zh"
})
Page({

  data: {
    //个人信息
    name: '',
    nation: '',
    sex: '',
    birthDay: '',
    birthPlace: '',
    school: '',
    academy: '',
    major: '',
    stuClass: '',
    stuNumber: '',
    tele: '',
    position: '',
    award: '',
    sexArray:['男','女'],
  },

 
  onLoad: function (options) {

  },
  //出生年月日picker
  changeBirthDay:function(e){
    this.setData({
      birthDay:e.detail.value
    })
  },
  //性别picker
  changeSex:function(e){
    this.setData({
      sex:this.data.sexArray[e.detail.value]
    })
  },
  //表单提交
  formSubmit:function(e){
      let name=e.detail.value.name
      let nation=e.detail.value.nation
      let sex=this.data.sexArray[e.detail.value.sex]
      let birthDay=e.detail.value.birthDay
      let birthPlace=e.detail.value.birthPlace
      let school=e.detail.value.school
      let academy=e.detail.value.academy
      let tele=e.detail.value.tele
      let position=e.detail.value.position

      if(name==""||nation==''||sex==''||birthDay==''||birthPlace==''||school==''||academy==''||tele==''||position==''){
        wx.showToast({
          title: '需要填写全部信息',
          icon:"none",
          duration:1500
        })
      }else{
        db.collection('admin').add({
          data: {
            _id: "8000116237",
            admin_password: "88888888",
            admin_name: name,
            admin_nation: nation,
            admin_sex: sex,
            admin_birthDate: birthDay,
            admin_birthPlace: birthPlace,
            admin_school:school,
            admin_academy: academy,
            admin_telephone: tele,
            admin_position: position,
            admin_dangWei:"软件学院党委",
            admin_branch:"软件工程党支部"
          },
          success: function (res) {
            console.log(res)
          }
        })
      }

  }

  
})