Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageImage1: { type: String, value: '/images/红圈.png' },
    messageImage2: { type: String, value: '/images/通知.png' },
    messageType:{type:String,value:'系统通知'},
    messageDate:{type:String,value:'2020-09-10'},
    messageContain: { type: String, value:'通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容'},
    isRed:{ type: Boolean,value:true},//小红点是否显示，代表是否已读


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

  }
})
