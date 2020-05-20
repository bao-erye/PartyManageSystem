//获取用户ID
var app=getApp()
var user_number=app.globalData.user_number
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    //活动信息
    acID:'',
    acTitle:'',
    acDate:'',
    acPlace:'',
    aObject:'',
    acBelong:'',
    acScore:0,
    acAffirmTime:'',
    acSigninTime:'',
    acBeginTime:'',
    acSum:0,//总参与人数
    acAffirmed:0,//已确认人数
    acSignined:0,//已签到人数
    acImageUrl:'',//活动图片路径
    acDetail:'',
    //公告中图片路径
    noticeImageUrlArray:['/images/白圈.png','/images/红圈.png'],
    affirmImageUrlIndex:0,
    signinImageUrlIndex:0,
    endImageUrlIndex:0,
    //收藏图标
    imageCollectArray:['/images/我的/我的收藏.png','/images/我的/收藏选中.png'],
    imageCollectIndex:0,
    collectText:'收藏',
    //按钮字样
    buttonArray:['未开始','确认参加','签到','进行中','已结束','已确认','已签到'],
    buttonIndex:0,
    //按钮yanse
    buttonColor: ['#837D7D','#E71111'],
    btnColorIndex:0,
    //按钮是否禁用
    disabled:false
  },
  onLoad: function (options) {
    var that=this
    //获取活动ID
    var activity_id=options.activity_id
    console.log('活动id：'+activity_id)
    that.setData({
      acID:activity_id
    })
    //查询活动信息
    db.collection('activity').doc(activity_id).get({
      success: function (res) {
        var activityDate=res.data.activity_date
        var affirmDateBegin=res.data.activity_affirmDateBegin
        var affirmDateEnd=res.data.activity_affirmDateEnd
        var affirmTimeBegin = res.data.activity_affirmTimeBegin
        var affirmTimeEnd = res.data.activity_affirmTimeEnd

        var signinBegin=res.data.activity_signinBegin
        var signinEnd=res.data.activity_signinEnd
        var begin=res.data.activity_begin
        var end=res.data.activity_end

        var acAffirmTime = affirmDateBegin + ' ' + affirmTimeBegin + '---' +affirmDateEnd+' '+affirmTimeEnd
        var acSigninTime = activityDate + ' ' + signinBegin + '---' +activityDate+' '+signinEnd
        var acBeginTime = activityDate + ' ' + begin + '---' +activityDate+' '+end
        that.setData(
          {
            acTitle: res.data.activity_title, //活动标题
            acDate: res.data.activity_date,
            acPlace: res.data.activity_place,
            aObject: res.data.activity_object,//活动对象
            acBelong: res.data.activity_issuer,//活动组织
            acScore: res.data.activity_score,//可得积分
            acAffirmTime: acAffirmTime,//确认时间
            acSigninTime: acSigninTime,//签到时间
            acBeginTime: acBeginTime,//开始具体时间
            acSum: res.data.activity_sum,//总参与人数
            acImageUrl: res.data.activity_imageID,//活动图片路径
            acDetail: res.data.activity_detail//活动详情
          }
        )
        //确定活动阶段
        var now_time = new Date().getTime()//现在的时间
        var affirmBeginTime = new Date(affirmBegin)
        var affirmEndTime = new Date(affirmEnd)
        var signinBeginTime = new Date(signinBegin)
        var signinEndTime = new Date(signinEnd)
        var beginTime = new Date(begin)
        var endTime = new Date(end)
        if(now_time<affirmBeginTime){//确认之前
          that.setData({
            buttonIndex:0,
            btnColorIndex:0,
            disabled:true,
          })
        }else if(now_time>=affirmBeginTime&&now_time<affirmEndTime){//确认中
          db.collection('activity').where({
              _id: activity_id,
              activity_affirmed:"8000116237"
          }).get({
            success:function(res){
              if(res.data.length>0){
                that.setData({
                  buttonIndex: 5,//设置按钮文字
                  btnColorIndex: 0,//设置按钮颜色
                  disabled: true, //设置是否禁用
                  affirmImageUrlIndex: 1,//设置确认图标
                  signinImageUrlIndex: 0,//设置签到图标
                  endImageUrlIndex: 0,//设置结束图标
                })
              }else{
                that.setData({
                  buttonIndex: 1,//设置按钮文字
                  btnColorIndex: 1,//设置按钮颜色
                  disabled: false, //设置是否禁用
                  affirmImageUrlIndex: 1,//设置确认图标
                  signinImageUrlIndex: 0,//设置签到图标
                  endImageUrlIndex: 0,//设置结束图标
                })

              }
            }
          })


        }else if(now_time>=affirmEndTime&&now_time<signinBeginTime){//确认后，签到前
          that.setData({
            buttonIndex:0,
            btnColorIndex:0,
            disabled:true,
            affirmImageUrlIndex: 1,
            signinImageUrlIndex: 0,
            endImageUrlIndex: 0,
          })
        }else if(now_time>=signinBeginTime&&now_time<signinEndTime){//签到中
          db.collection('activity').where({
            _id: activity_id,
            activity_signined: "8000116237"
          }).get({
            success: function (res) {
              if (res.data.length > 0) {
                that.setData({
                  buttonIndex: 6,//设置按钮文字
                  btnColorIndex: 0,//设置按钮颜色
                  disabled: true, //设置是否禁用
                  affirmImageUrlIndex: 1,//设置确认图标
                  signinImageUrlIndex: 1,//设置签到图标
                  endImageUrlIndex: 0,//设置结束图标
                })
              } else {
                that.setData({
                  buttonIndex: 1,//设置按钮文字
                  btnColorIndex: 1,//设置按钮颜色
                  disabled: false, //设置是否禁用
                  affirmImageUrlIndex: 1,//设置确认图标
                  signinImageUrlIndex: 1,//设置签到图标
                  endImageUrlIndex: 0,//设置结束图标
                })

              }
            }
          })
        }else if(now_time>=signinEndTime&&now_time<endTime){//签到后，结束前
          that.setData({
            buttonIndex:3,
            btnColorIndex:0,
            disabled:true,
            affirmImageUrlIndex: 1,
            signinImageUrlIndex: 1,
            endImageUrlIndex: 0,
          })
        }else if(now_time>=endTime){//结束后
          that.setData({
            buttonIndex:4,
            btnColorIndex:0,
            disabled:true,
            affirmImageUrlIndex: 1,
            signinImageUrlIndex: 1,
            endImageUrlIndex: 1,
          })
        }


      }
    })
    //获取已确认人数
    db.collection('activity').doc(activity_id).get({
      success:function(res){
        let affirmed = res.data.activity_affirmed.length //获取已确认名单长度
        that.setData({
          acAffirmed:affirmed //设置已确认人数
        })
      }
    })
    //获取已参加人数
    db.collection('activity').doc(activity_id).get({
      success: function (res) {
        let signined = res.data.activity_signined.length //获取已确认名单长度
        that.setData({
          acSignined: signined //设置已确认人数
        })
      }
    })
    //检测是否已收藏
    db.collection('collect').where({
      collect_userID:user_number,
      collect_activityID:activity_id
    }).get({
      success:function(res){
        console.log(res.data.length)
        if(res.data.length>0){
          //已结收藏设置取消收藏样式
          that.setData({
            imageCollectIndex: 1,
            collectText: '取消收藏'
          })
        }else{
          that.setData({
            imageCollectIndex: 0,
            collectText: '收藏'
          })
        }
      }
    })

  },
  //收藏点击事件
  collectTap: function (e) {
    var that=this
    var imageCollectIndex=that.data.imageCollectIndex
    var collectText=that.data.collectText
    let user_number=app.globalData.user_number
    let activity_id=that.data.acID
    if(imageCollectIndex==0&&collectText=='收藏'){
      //收藏活动，写入数据库
      db.collection('collect').add({
        data:{
          collect_userID:user_number,
          collect_activityID:activity_id
        },success:function(res){
          console.log('收藏成功')
          wx.showToast({
            title: '收藏成功',
            icon:'none',
            duration:1500
          })
          //设置取消收藏样式
          that.setData({
            imageCollectIndex:1,
            collectText:'取消收藏'
          })
        }
      })
    } else if (imageCollectIndex == 1 && collectText == '取消收藏'){
      //取消收藏，删除记录
      db.collection('collect').where({
        collect_activityID: activity_id,
        collect_userID: user_number
      }).remove({
        success:function(res){
          console.log('成功取消收藏')
          wx.showToast({
            title: '成功取消收藏',
            icon:'none',
            duration:1500
          })
          //设置收藏样式
          that.setData({
            imageCollectIndex: 0,
            collectText: '收藏'
          })
        }
      })
    }
  },
  //按钮点击事件
  buttonTap: function (e) {
    var that=this
    let buttonIndex=this.data.buttonIndex
    let activity_id=this.data.acID
    let user_number=app.globalData.user_number
    console.log(buttonIndex)
    console.log(activity_id)
    console.log(user_number)
    if (buttonIndex==1){//确认参加
      const _=db.command
      db.collection('activity').doc(activity_id).update({
        data:{
          activity_affirmed:_.push(user_number)
        },success:function(res){
          console.log('确认成功')
          that.setData({
            buttonIndex: 5,//设置按钮文字
            btnColorIndex: 0,//设置按钮颜色
            disabled: true, //设置是否禁用
          })
        }
      })
    }else if(buttonIndex==2){//签到
      const _=db.command
      db.collection('activity').doc(activity_id).update({
        data: {
          activity_signined: _.push(user_number)
        }, success: function (res) {
          console.log('签到成功')
          that.setData({
            buttonIndex: 6,//设置按钮文字
            btnColorIndex: 0,//设置按钮颜色
            disabled: true, //设置是否禁用
          })
        }
      })
    }
  },
})

