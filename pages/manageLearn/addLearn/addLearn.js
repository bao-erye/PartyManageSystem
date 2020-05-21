//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    learnTitle:'',
    learnContain: '',
    scoreTime: '',
    scoreScore:'',
  },

  onLoad: function (options) {

  },
  //表单提交事件
  formSubmit: function (e) {
    let title=e.detail.value.learnTitle
    let contain=e.detail.value.learnContain
    let time=e.detail.value.scoreTime
    let score=e.detail.value.scoreScore
    db.collection('study').add({
      data:{
        study_title: title,
        study_contain: contain,
        study_time: time,
        study_score: score
      },success:function(res){
        console.log('数据提交成功')
        wx.showToast({
          title: '新建成功',
          icon:'none',
          duration:2000,
          complete:function(e){
            wx.navigateBack({})
          }
        })
        
      }
      
    })
    
  }

})