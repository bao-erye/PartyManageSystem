var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    //个人信息
    name:'',
    nation:'',
    sex:'',
    birthDay:'',
    birthPlace:'',
    school:'',
    academy:'',
    major:'',
    stuClass:'',
    tele:'',
    position:'',
    award:'',
    sexArray: ['男', '女'],
    sexIndex: 0,
  },
  onLoad: function (options) {
    var that=this
    var user_number=app.globalData.user_number
    db.collection('user').doc(user_number).get({
      success:function(res){
        var user=res.data
        that.setData({
          name:user.user_name,
          nation:user.user_nation,
          sex:user.user_sex,
          birthDay:user.user_birthDay,
          birthPlace:user.user_birthPlace,
          school:user.user_school,
          academy:user.user_academy,
          major:user.user_major,
          stuClass:user.user_class,
          tele:user.user_telephone,
          position:user.user_position,
          award:user.user_award
        })
      }
    })

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
  //提交修改
  formSubmit:function(e){
    var that=this
    let user_number=app.globalData.user_number
    let name=e.detail.value.name
    let nation=e.detail.value.nation
    let sex=that.data.sex
    let birthDay=that.data.birthDay
    let birthPlace=e.detail.value.birthPlace
    let school=e.detail.value.school
    let academy=e.detail.value.academy
    let major=e.detail.value.major
    let stuClass=e.detail.value.stuClass
    let tele=e.detail.value.tele
    let position=e.detail.value.position
    let award=e.detail.value.award
    db.collection('user').doc(user_number).update({
      data:{
        user_name:name,
        user_nation:nation,
        user_sex:sex,
        user_birthDay:birthDay,
        user_birthPlace:birthPlace,
        user_school:school,
        user_academy:academy,
        user_major:major,
        user_class:stuClass,
        user_telephone:tele,
        user_position:position,
        user_award:award
      },success:function(res){
        console.log('更新成功')
        wx.showToast({
          title: '修改成功',
          icon:'none',
          duration:1500,
          success:function(){
            setTimeout(() => {
              //关闭当前页面
              wx.navigateBack({})
            }, 1500);
          }
        })
        
      }
    })
  }

})