//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    testTitle:'',
    time:0,
    title:'',
    optionA:'',
    optionB:'',
    optionC:'',
    optionD:'',
    arrayChoose:['A','B','C','D'],
    truth:'',
    arrayTest:[],
    testSum:0,//已添加题目数
  },
  onLoad: function (options) {

  },
  //考核标题
  inputTestTitle:function(e){
    this.setData({
      testTitle:e.detail.value
    })
  },
  //考核时长
  inputTime:function(e){
    this.setData({
      time:e.detail.value
    })
  },
  //题目
  inputTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  //选择A
  inputOA:function(e){
    this.setData({
      optionA:e.detail.value
    })
  },
  //B
  inputOB:function(e){
    this.setData({
      optionB:e.detail.value
    })
  },
  //C
  inputOC:function(e){
    this.setData({
      optionC:e.detail.value
    })
  },
  //D
  inputOD:function(e){
    this.setData({
      optionD:e.detail.value
    })
  },
  //正确选项picker
  changeTruth:function(e){
    this.setData({
      truth:this.data.arrayChoose[e.detail.value]
    })
  },
  //添加题目
  tapAdd:function(e){
    var that=this
    var arrayTest=this.data.arrayTest
    var title=this.data.title
    var optionA=this.data.optionA
    var optionB=this.data.optionB
    var optionC=this.data.optionC
    var optionD=this.data.optionD
    var truth=this.data.truth
    if(title==''||optionA==''||optionB==''||optionC==''||optionD==''||truth==''){
      wx.showToast({
        title: '题目内容输入不能为空',
        icon: 'none',
        duration: 1500,
      })
    }else{
      //将输入作为题目对象加入数组
      arrayTest.push({
        title: title,
        A: { name: 'A', value: optionA },
        B: { name: 'B', value: optionB },
        C: { name: 'C', value: optionC },
        D: { name: 'D', value: optionD },
        truth: truth
      })
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        duration: 1500,
        complete:function(res){
          //清空输入框
          that.setData({
            title: ' ',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            truth: '',
            testSum:that.data.testSum+1
          })
        }
      })
      
    }
    
  },
  //提交考核
  tapSubmit:function(e){
    var testTitle=this.data.testTitle
    var time=this.data.time
    var contain=this.data.arrayTest
    console.log(testTitle)
    console.log(time)
    console.log(contain)
    if(testTitle==''||time==0||contain==''){
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500,
      })
    }else{
      db.collection('exam').add({
        data:{
          exam_title:testTitle,
          exam_time:time,
          exam_contain:contain
        },success:function(res){
          console.log('成功提交考核')
          wx.showToast({
            title: '成功创建考核内容',
            icon:'none',
            duration:2000,
            success:function(res){
              setTimeout(function(){
                //返回上一页
                wx.navigateBack({})
              },2000)
            }
          })
        }
      })
    }
  }

})