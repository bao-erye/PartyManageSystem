//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
    else {
      wx.cloud.init({
        traceUser: true,
        env:"party-test-3q2zh"
      })
    }
    this.getOpenid()//获取openid并设置


  },
  globalData: {
    openid:'',//程序初始化时获得
    user_number:'8000116237',//登录时设置
    //userInfo: null
    //红色：#E71111
    //浅灰色：#BBBBBE
    //深灰色：#837D7D
  },
  getOpenid() {
    let page = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openid
        page.globalData.openid=openid
      }
    })
  },
})