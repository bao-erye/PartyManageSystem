//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    study_id:'',
    learnTitle:'',
    learnContain:'',
    scoreTime:'',
    scoreScore:'',
  },

  onLoad: function (options) {
    var that=this
    var studyID=options.studyID
    console.log(studyID)
    that.setData({
      study_id:studyID
    })
    db.collection('study').doc(studyID).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          learnTitle:res.data.study_title,
          learnContain:res.data.study_contain,
          scoreTime:res.data.study_time,
          scoreScore:res.data.study_score
        })
      }
    })
  },
  //表单提交事件
  formSubmit:function(e){
    var that=this
    let studyID=that.data.study_id
    let title=e.detail.value.learnTitle
    let contain=e.detail.value.learnContain
    let time=e.detail.value.scoreTime
    let score=e.detail.value.scoreScore
    //判断是否输入有空
    if(title==''||contain==''||time==''||score==''){
      wx.showToast({
        title: '输入不能为空',
        icon:'none',
        duration:1500
      })
    }else{
      //将更新数据写入数据库
      db.collection('study').doc(studyID).update({
        data:{
          study_title:title,
          study_contain:contain,
          study_time:time,
          study_score:score,
        },success:function(res){
          console.log('更新成功')
          wx.showToast({
            title: '内容修改成功',
            icon:'none',
            duration:10000,
            complete: function () {
              wx.navigateBack({})
            }
          })
        }
      })
    }
  }

})