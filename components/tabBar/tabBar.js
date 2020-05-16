// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    //点击首页
    tapIndex:function(){wx.redirectTo({
      
      url: '/pages/manageIndex/manageIndex/manageIndex',
    })},
    //点击活动
    tapActivity:function(){wx.redirectTo({
      url: '/pages/manageActivity/manageActivity',
    })},
    //点击学习
    tapLearn:function(){wx.redirectTo({
      url: '/pages/manageLearn/manageLearn',
    })},
    //点击我的
    tapMine:function(){wx.redirectTo({
      url: '/pages/manageMine/manageMine',
    })}

  }
})
