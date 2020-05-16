// pages/manageIndex/manageIndex.js
Page({

 
  data: {
    arrayMasses: ['1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '1', '2', '3', '2', '3', '4', '1', '2', '3', '1', '2', '3'],//群众信息数组
    arrayColor: ['#7D7272','#E71111'],//背景色数组
    //背景色index
    massColorIndex:1,
    activerColorIndex:0,
    developColorIndex:0,
    readyColorIndex:0,
    memberColorIndex:0,
    inputName:null,//姓名输入内容
    inputTele:null,//手机号输入内容

  },

  onLoad: function (options) {

  },
  //群众tap
  tapMasses:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 1,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
  },
  //入党积极分子tap
  tapActiver:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 1,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
  },
  //发展对象tap
  tapDevelop:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 1,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
  },
  //预备党员tap
  tapReady:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 1,
      memberColorIndex: 0,
    })
  },
  //党员tap
  tapMember:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 1,
    })
  },
  //搜索tap
  tapSearch:function(){

  }

  
})