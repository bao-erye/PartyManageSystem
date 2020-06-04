//云数据库初始化
wx.cloud.init({env: "party-test-3q2zh"})
const db = wx.cloud.database({env: "party-test-3q2zh"})
Page({
  data: {
    images: [],
    arrayImageID:[],//滑动窗图片ID
    //活动对象数组
    arrayActivity:[],
  },
  onLoad: function () {
    var that = this;
    //获取活动对象
    db.collection('activity').get({
      success:function(res){
        //获取活动图片ID
        var length=res.data.length;
        var array=new Array();
        var i=0;
        for(i = 0 ;i<length;i++){
          array.push(res.data[i].activity_imageID)//将图片ID存入数组
        }
        that.setData({
          arrayImageID:array//将数组赋值给data
        })
        
      }
    })
    //获取最近活动
    var nowTime = new Date().getTime()//获取现在日期
    db.collection('activity').get({
      success:function(res){
        var activitys=res.data
        var array=[]
        var i=0
        for(i;i<activitys.length;i++){
          let time=new Date(activitys[i].activity_date)
          if(time>nowTime){
            array.push(activitys[i])
          }else{
          }
        }
        that.setData({
          arrayActivity:array
        })
      }
    })
  },
  //入党申请书
  bandtapApplyParty: function (e) {
    wx.navigateTo({
      url: '/pages/index/applyParty/applyParty',
    })
  },
  //缴纳党费
  bandtapPartyCost: function (e) {
    wx.navigateTo({
      url: '/pages/index/partyCost/partyCost',
    })
  },
  //思想报告
  bandtapReport: function (e) {
    wx.navigateTo({
      url: '/pages/index/report/report',
    })
  },
  //登记表
  bandtapCheck: function (e) {
    wx.navigateTo({
      url: '/pages/index/checkTable/checkTable',
    })
  },
  //投票
  bandtapProcess: function (e) {
    wx.navigateTo({
      url: '/pages/index/process/process',
    })
  },
  //学习与考核
  bandtapTest: function (e) {
    wx.navigateTo({
      url: '/pages/index/test/test',
    })
  },
  //党费计算器
  bandtapCalculator: function (e) {
    wx.navigateTo({
      url: '/pages/index/calculator/calculator',
    })
  },
  //转入转出
  bandtapInOut: function (e) {
    wx.navigateTo({
      url: '/pages/index/inAndOut/inAndOut',
    })
  },
  //选择活动
  tapActivity: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/activity/activityDetail/activityDetail?activity_id=' + that.data.arrayActivity[e.currentTarget.id]._id,
    })
  }
})
