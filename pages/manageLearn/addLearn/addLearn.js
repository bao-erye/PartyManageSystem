Page({

  data: {
    learnTitle:"dang",
    learnContain: null,
    scoreTime: null,
    scoreScore:null,
  },

  onLoad: function (options) {

  },
  //表单提交事件
  formSubmit: function (e) {
    this.setData({
      learnTitle:e.detail.value.learnTitle,
      learnContain:e.detail.value.learnContain,
      scoreTime:e.detail.value.scoreTime,
      scoreScore:e.detail.value.scoreScore
    });
    
  }

})