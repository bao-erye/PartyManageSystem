Page({


  data: {
    dangweiArray:['软件学院','信息科学学院','计算机学院','物理学院','医学院'],
    dangweiIndex:0,
    // partyName: ,
    // partyDangwei: ,
    // managerName: ,
    // manaerTele: ,
  },

  onLoad: function (options) {

  },
  //党委picker
  changeDangwei:function(e){
    this.setData({
      dangweiIndex:e.detail.value
    })
  },
  //表单提交
  formSubmit:function(e){
    console.log(e)
    this.setData({
    })
  }
})