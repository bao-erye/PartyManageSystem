var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    examTime:0,
    timerName: null,//定时器名字
    timer: 0,//剩余时间
    arrayTestChoose: [],//试题对象数组
    testScore: 0,//分数
    title:'',//考核标题
    
  },
  onLoad: function (options) {
    var that=this
    var examID = options.examID
    var userID=app.globalData.user_number
    db.collection('exam').doc(examID).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          arrayTestChoose:res.data.exam_contain,
          examTime:res.data.exam_time,
          title:res.data.exam_title
        })
        //检查用户是否参加过该考核
        var title=that.data.title
        console.log(title)
        db.collection('user').where({
          _id:userID,
          'user_exam.examTitle':title
        }).get({
          success:function(res){
            console.log(res.data.length)
            if(res.data.length>0){
              wx.showToast({
                title: '您已经参加过本次考核',
                icon:'none',
                duration:2000,
                success:function(){
                  setTimeout(function(){
                    wx.navigateBack({ delta: 2 })//返回上上页面
                  },2000)
                }
              })
            }else{
              //开启倒计时
              that.timer()
            }
          }
        })
        
      }
    })
  },
  //定时器
  timer: function () {
    var that = this;
    var time = that.data.examTime * 60;//获取倒计时初始值,单位分钟
    that.setData({
      timerName: setInterval(function () {
        time--;
        //得到剩余分钟
        let minute = parseInt(time / 60)
        //得到剩余秒数
        let second = (time - minute * 60)
        //int转String
        let timer = minute.toString() + ':' + second.toString()
        //设置值
        that.setData({
          timer: timer
        })
        if (time == 0) {
          clearInterval(that.data.timerName)//关闭定时器
          //交卷
          that.tapBtn()
        }
      }, 1000)
    })
  },

  //单选框选中事件
  bindchange: function (e) {
    var that = this
    var choose = e.detail.value;
    console.log('选择答案:' + choose)
    //关闭定时器
    clearInterval(that.data.timerName)
    var truth = this.data.arrayTestChoose[e.target.id].truth
    console.log('正确答案' + truth)
    if (choose == truth) {
      that.setData({
        testScore: that.data.testScore+1
      })
    } else {
      console.log('选择错误')
    }
    var choose = 'arrayTestChoose[' + e.target.id + '].choose';
    this.setData({
      [choose]: true
    })

  },
  //交卷
  tapBtn:function(e){
    console.log(this.data.testScore)
    var userID=app.globalData.user_number
    var score=this.data.testScore.toString()
    var title=this.data.title
    var year = new Date().getFullYear()
    var month = new Date().getMonth()+1
    var day = new Date().getDate()
    var nowTime = year + '-' + month + '-' + day
    console.log(nowTime)
    wx.showToast({
      title: '您的考核结果为：'+score+'分',
      icon:'none',
      duration:2000,
      success:function(){
        const _=db.command
        db.collection('user').doc(userID).update({
          data:{
            user_exam:_.push({examTitle:title,time:nowTime,score:score})
          },success:function(res){
            console.log('更新考核结果成功')
            //返回上页面
            setTimeout(function () {
              wx.navigateBack({ delta: 2 })
            }, 2000)
          }
        })
        
      }
    })
  },


})