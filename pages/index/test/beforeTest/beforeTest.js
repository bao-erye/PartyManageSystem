
Page({

  data: {
    examID:'',//考核ID
  },


  onLoad: function (options) {
    var exam_id=options.examID
    console.log(exam_id)
    this.setData({
      examID:exam_id
    })
  },
  //开始考试
  tapBegin:function(e){
    var examID=this.data.examID
    wx.navigateTo({
      url: '/pages/index/test/testDetail/testDetail?examID='+examID,
    })
  }

  
})