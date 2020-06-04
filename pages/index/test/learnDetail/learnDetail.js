var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    learnTitle:'',//学习标题
    learnDetail:'',//学习内容
    learnTime:0,//学习时间
    learnScore:0,//可得积分
    timer:'0:0',//定时器
    timerName:null,
    number:''//用户ID
  },

  onLoad: function (options) {
    var that=this
    var id=options.id
    var user_number=app.globalData.user_number
    //获取学习内容
    db.collection('study').get({
      success: function (res) {
        that.setData({
          learnTitle:res.data[id].study_title,
          learnDetail:res.data[id].study_contain,
          learnTime:res.data[id].study_time,
          learnScore:res.data[id].study_score,
          number:user_number
        })
        //查询是否存在积分项
        let title = that.data.learnTitle
        const _ = db.command
        db.collection('user').where({
          _id: user_number,
          'user_scores.title': title
        }).get({
          success: function (res) {
            if (res.data.length > 0) {//如果存在积分项
              wx.showToast({
                title: '您已经获得该板块积分',
                icon: 'none',
                duration: 1500
              })
            } else {
              //触发定时器
              that.timer()
            }
          }
        })


      }
    })
    
  },
  //定时器
  timer:function(){
    var that = this;
    var time = that.data.learnTime*60;//获取倒计时初始值,单位分钟
    var year=new Date().getFullYear()
    var month=new Date().getMonth()+1
    var day=new Date().getDate()
    var nowTime=year+'-'+month+'-'+day
    that.setData({
      timerName: setInterval(function () {  
        time--;
        //得到剩余分钟
        let minute=parseInt(time/60)
        //得到剩余秒数
        let second=(time-minute*60)
        //int转String
        let timer=minute.toString()+':'+second.toString()
        //设置值
        that.setData({
           timer: timer
        })
        if (time == 0) {
          clearInterval(that.data.timerName)
          //关闭定时器之后，更新积分
          var user_number=that.data.number
          var score=parseInt(that.data.learnScore)
          var title = that.data.learnTitle
          //更新积分
          const _=db.command
          db.collection('user').doc(user_number).update({
            data: {
              'user_scores.0': _.inc(score),
            },
            success: function (res) {
              console.log("积分更新成功")
              //添加积分项
              db.collection('user').doc(user_number).update({
                data: {
                  user_scores: _.push({"nowTime":nowTime,"title":title,"score":score})
                },
                success: function (res) {
                  console.log("恭喜获得积分")
                  wx.showToast({
                    title: '恭喜您获得积分',
                    icon: 'none',
                    duration:1500
                  })
                }
              })
            },fail:function(res){
              console.log('积分更新失败')
              wx.showToast({
                title: '服务器出小差啦，稍后再试',
                icon:'none',
                duration:1500
              })
            }
          })
          
        }
       }, 1000)
    })
  }

})