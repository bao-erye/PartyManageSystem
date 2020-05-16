Page({

  data: {
    arrayLearn: ['党章', '党规', '共产党宣言', '党规', '共产党宣言', '党规', '共产党宣言', '党规', '共产党宣言'],
    arrayTest:['第一次考核','第二次考核','第三次考核','第四次考核','第五次考核']

  },

  onLoad: function (options) {

  },
  //添加学习内容
  tapAddLearn:function(e){

  },
  //添加考核内容
  tapAddTest:function(e){

  },
  //点击列表
  tapItem:function(e){
    console.log(e.currentTarget.id)//获取点击的内容的index
  }
})