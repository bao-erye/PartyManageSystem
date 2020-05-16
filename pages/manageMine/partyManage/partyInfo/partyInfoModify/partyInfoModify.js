Page({


  data: {
    dangwei:null,
    dangweiArray:['软件学院','物理学院','医学院','化学学院','工程学院'],
    dangweiIndex:0,
    partyName:'软件工程党支部',
    managerName:'王晨宝',
    managerTele:15079617331,
    managerPosition:'教授',
    managerNumber:8000116237,
  },

  onLoad: function (options) {

  },
  //所属党委picker
  changeDangwei:function(e){
    this.setData({
      dangwei:this.data.dangweiArray[e.detail.value]
    })
    console.log(this.data.dangwei)
  },
  //form提交
  formSubmit:function(e){
    console.log(e)
    this.setData({
      partyName:e.detail.value.partyName,
      managerName:e.detail.value.managerName,
      managerTele:e.detail.value.managerTele,
      managerPosition:e.detail.value.managerPosition,
      managerNumber:e.detail.value.managerNumber
    })

  }

})