// components/activityItem/activityItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityTitle: { type: String, value:'文章标题文章标题题'},
    activityTime:{type:String,value:'2020年5月20日'},
    activityPosition:{type:String,value:'逸夫馆'},
    activityJoinSum: { type: Int16Array, value: '20' },
    activityIssuer:{type:String,value:'软件工程党支部'},
    activityDate:{type:Date,value:'2020-04-07'},
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
    activityClick:function(e){
      console.log(e);
    }

  }
})
