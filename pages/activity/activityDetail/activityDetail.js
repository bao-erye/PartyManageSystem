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
    aObject:'入党积极分子',
    acBelong:'软件学院',
    acScore:5,
    acAffirmTime:'2020-01-01--2020-01-02',
    acSigninTime:'08:00--08:15',
    acBeginTime:'08:00--10:00',
    acSum:50,//总参与人数
    acAffirmed:40,//已确认人数
    acSignined:30,//已签到人数
    acImageUrl:'/images/滑动窗/1.jpg',//活动图片路径
    acDetail:'活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动',
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
    // var that=this
    // let activity_id = options.activity_id //获取上个页面传递过来的活动编号
    // wx.cloud.init({             //云开发初始化
    //   env: 'party-test-3q2zh'   //云开发环境
    // })
    // const DB = wx.cloud.database(); //获取云数据库实例
    // //获取活动基本信息
    // DB.collection('activity').doc(activity_id).get({
    //   success: function (res) {
    //     that.setData(
    //       {
    //         acTitle: res.data.activity_title, //活动标题
    //         acDate: res.data.activity_date,
    //         acPlace: res.data.activity_place,
    //         aObject: res.data.activity_object,//活动对象
    //         acBelong: res.data.activity_belong,//活动组织
    //         acScore: res.data.activity_score,//可得积分
    //         acAffirmTime: res.data.activity_affirmTime,//确认时间
    //         acSigninTime: res.data.activity_signinTime,//签到时间
    //         acBeginTime: res.data.activity_beginTime,//开始具体时间
    //         acSum: res.data.activity_sum,//总参与人数
    //         acImageUrl: res.data.activity_imageUrl,//活动图片路径
    //         acDetail: res.data.activity_detail//活动详情
    //       }
    //     )
    //   }
    // })
    // //获取已确认人数
    // DB.collection('activity').doc(activity_id).get({
    //   success:function(res){
    //     let affirmed = res.data.activity_affirmed.length //获取已确认名单长度
    //     that.setData({
    //       acAffirmed:affirmed //设置已确认人数
    //     })
    //   }
    // })
    // //获取已参加人数
    // DB.collection('activity').doc(activity_id).get({
    //   success: function (res) {
    //     let signined = res.data.activity_signined.length //获取已确认名单长度
    //     that.setData({
    //       acSignined: signined //设置已确认人数
    //     })
    //   }
    // })
    

  },
})

