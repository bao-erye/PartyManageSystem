Page({

  data: {
    //单选框内容
    xueyuanArray: ['软件学院', '计算机学院', '信息科学学院', '物理学院'],
    xueyuanIndex: 0,
    objectArray: ['群众', '入党积极分子', '发展对象', '预备党员','党员'],
    objectIndex: 0,
    statusArray: ['未开始', '进行中', '已结束'],
    statusIndex: 0,
    //活动数组
    activityArray:['1','1','1','1','1']
  },
  //新建活动
  tapAdd:function(){
    
  },
  //单选框点击事件
  changeXueyuan:function(e){
    this.setData({ xueyuanIndex: e.detail.value });
  },
  changeObject: function (e) {
    this.setData({ objectIndex: e.detail.value });
  },
  changeStatus: function (e) {
    this.setData({ statusIndex: e.detail.value });
  },

 
  onLoad: function (options) {

  },

  
})