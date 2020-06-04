
Component({

  properties: {
    index:Number,
    activity:Number,
    learn:Number,
    mine:Number,
  },
  data: {
    arrayIndex:['/images/menu/index.png','/images/menu/indexChoose.png'],
    arrayActivity:['/images/menu/activity.png','/images/menu/activityChoose.png'],
    arrayLearn:['/images/menu/learn.png','/images/menu/learnChoose.png'],
    arrayMine:['/images/menu/mine.png','/images/menu/mineChoose.png'],
    
  },

  methods: {
    //点击首页
    tapIndex:function(){
      this.setData({
        index:1,
        activity:0,
        learn:0,
        mine:0
      })
      wx.redirectTo({
      url: '/pages/manageIndex/manageIndex/manageIndex',
    })},
    //点击活动
    tapActivity:function(){
      this.setData({
        index:0,
        activity:1,
        learn:0,
        mine:0
      })
      wx.redirectTo({
      url: '/pages/manageActivity/manageActivity',
    })},
    //点击学习
    tapLearn:function(){
      this.setData({
        index:0,
        activity:0,
        learn:1,
        mine:0
      })
      wx.redirectTo({
      url: '/pages/manageLearn/manageLearn',
    })},
    //点击我的
    tapMine:function(){
      this.setData({
        index:0,
        activity:0,
        learn:0,
        mine:1
      })
      wx.redirectTo({
      url: '/pages/manageMine/manageMine',
    })}

  }
})
