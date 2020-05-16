Page({

  data: {
    learnTitle:'党章',
    learnContain:'文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
    scoreTime:'30',
    scoreScore:'5',
  },

  onLoad: function (options) {

  },
  //表单提交事件
  formSubmit:function(e){
    
    this.setData({
      learnTitle:e.detail.value.learnTitle
    })
    console.log(e.detail.value.scoreTime)
  }

})