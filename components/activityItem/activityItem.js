
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    acTitle: { type: String, value:'文章标题文章标题题'},
    acDate:{type:Date,value:'2020-5-20'},
    acPlace:{type:String,value:'逸夫馆'},
    acIssuer:{type:String,value:'软件工程党支部'},
    acObject:{type:String,value:'入党积极分子'},
    imageUrl:{type:String,value:'/images/滑动窗/1.jpg'},
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //activity点击事件
    tapActivity:function(e){
      console.log(e);
    }

  }
})
