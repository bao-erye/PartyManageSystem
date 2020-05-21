//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    userID:'',
    name:'',
    nation: '',
    sex: '',
    birthPlace: '',
    birthDay: '',
    school: '',
    academy: '',
    major: '',
    stuClass: '',
    stuNumber: '',
    telenumber: '',
    position: '',
    award: '',
    family: '',
    society: '',
    applyHistory: '',
    work: '',
    punishment: '',
    score: 98,
    arrayScore:[],
    arrayReport: [],
    application:"",
    zhengshen:"",
    readyTest:"",
    partyCost: '',//党费
    btnText:'设置',//按钮文本
    btnColor:'#E71111',//按钮背景色
    disabled:false,//是否禁用


    
  },

  onLoad: function (options) {
    var that = this
    var user_id = options.userID
    var month=new Date().getMonth()+1
    this.setData({
      userID: user_id
    })
    db.collection('user').doc(user_id).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          name: res.data.user_name,
          nation: res.data.user_nation,
          sex: res.data.user_sex,
          birthPlace: res.data.user_birthPlace,
          birthDay: res.data.user_birthDay,
          school: res.data.user_school,
          academy: res.data.user_academy,
          major: res.data.user_major,
          stuClass: res.data.user_class,
          stuNumber: res.data._id,
          telenumber: res.data.user_telephone,
          position: res.data.user_position,
          award: res.data.user_award,
          family: res.data.user_family,
          society: res.data.user_society,
          applyHistory: res.data.user_applyHistory,
          work: res.data.user_work,
          punishment: res.data.user_punishment,
          score: res.data.user_scores[0],
          arrayReport: res.data.user_report,
          application:res.data.user_application,
          zhengshen:res.data.user_politicalExam,
          readyTest:res.data.user_prepareExam

        })
        //获取积分项
        var i = 0
        var arrayItem = []
        var scoreItems = res.data.user_scores
        for (i = 0; i < scoreItems.length; i++) {
          if (i == 0) {
            continue;
          } else {
            arrayItem.push(scoreItems[i])
          }
        }
        that.setData({
          arrayScore: arrayItem
        })
      }
    })
    //查询本月党费是否设置
    db.collection('charge').where({
      charge_userID: user_id,
      charge_month:month
    }).get({
      success:function(res){
        console.log(res.data)
        if(res.data.length>0){
          //本月党费已经设置，改变按钮样式
          that.setData({
            btnText: '已设置',//按钮文本
            btnColor: '#837D7D',//按钮背景色
            disabled: true,//是否禁用
          })
        }
      }
    })
  },
  //党费输入事件
  inputCharge:function(e){
    this.setData({
      partyCost:e.detail.value
    })
  },
  //设置党费按钮
  tapPartyCost:function(e){
    var partyCost=this.data.partyCost//获取输入党费
    var userid=this.data.userID
    var userName=this.data.userName
    var month = new Date().getMonth()+1
    var year=new Date().getFullYear()
    db.collection('charge').add({
      data:{
        charge_userID:userid,
        charge_userName:userName,
        charge_year:year,
        charge_month:month,
        charge_isPayed:0,
        charge_account:partyCost
      },success:function(res){
        console.log('党费设置成功')
        wx.showToast({
          title: '党费设置成功',
          icon:'none',
          duration:1500
        })
        wx.navigateBack({})
      }
    })


  }

})