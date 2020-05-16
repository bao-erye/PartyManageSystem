
Page({

  data: {
    typeArray:['月薪制','年薪制'],
    partyPay:0,
    incomeType:'月薪制',
    incomeInput:0,
  },
  //收入方式选择器
  bindchangeIncome:function(e){
    this.setData({
      incomeType: this.data.typeArray[e.detail.value]
    })
  },
  //收入输入框失焦
  blurIncome:function(e){
    this.setData({
      incomeInput:e.detail.value
    })
  },
  //计算按钮
  bindtapCalculator:function(){
    let incomeType=this.data.incomeType
    let incomeInput=this.data.incomeInput
    let partyPay = this.data.partyPay
    if(incomeType=='年薪制'){
      incomeInput = incomeInput / 12
    }
    //计算党费
    if(incomeInput<=3000){
      partyPay = incomeInput*0.005
    }else if(incomeInput<=5000){
      partyPay=(incomeInput-3000)*0.01+15
    }else if(incomeInput<=10000){
      partyPay=(incomeInput-5000)*0.015+35
    }else if(incomeInput>10000){
      partyPay=(incomeInput-10000)*0.02+110
    }
    //获取党费
    console.log(partyPay)
    this.setData({
      partyPay:partyPay
    })
  },

  onLoad: function (options) {

  },
})