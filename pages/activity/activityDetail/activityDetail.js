// pages/activity/activityDetail/activityDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //活动信息
    acTitle:'活动标题',
    acDate:'2020年4月7日',
    acPlace:'逸夫馆门口',
    acHost:'党委副书记',
    acType:'实践活动',
    acScore:5,
    acAffirmTime:'2020-01-01 00:00-2020-01-02 23:00',
    acSigninTime:'2020-01-03 08:00-2020-01-03 08:15',
    acBeginTime:'2020-01-03 08:00-2020-01-03 10:00',
    acSum:50,//总参与人数
    acAffirmed:40,//已确认人数
    acSignined:30,//已签到人数
    acImageUrl:'/images/滑动窗/1.jpg',//活动图片路径
    acDetail:'   活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动',
    //公告中图片路径
    noticeImageUrlArray:['/images/白圈.png','/images/红圈.png'],
    affirmImageUrlIndex:1,
    signinImageUrlIndex:1,
    endImageUrlIndex:0,
    //收藏图标
    imageCollectImageArray:['/images/我的/我的收藏.png','/images/我的/收藏选中.png'],
    imageCollectImageIndex:0,
    //按钮字样
    buttonArray:['确认参加','签到','已结束'],
    buttonIndex:0,
  },
  //收藏点击事件
  collectTap:function(e){
    this.setData({imageCollectImageIndex:1});
  },
  //按钮点击事件
  buttonTap:function(e){

  },


  onLoad: function (options) {

  },
})