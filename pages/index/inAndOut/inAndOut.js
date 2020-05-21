var app=getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    user_name:'',
    user_belong:'',
    gotoDangwei:'',
    gotoBranch:'',
    multiArray: [['软件学院党委', '计算机学院党委'], ['软件工程党支部', '信息安全党支部']],
    multiIndex: [0, 0],
    pickerTime:'',
    reason:'',

  },

  onLoad: function (options) {
    var that=this
    var number = app.globalData.user_number
    var name
    var dangwei
    var branch
    var belong
    db.collection('user').doc(number).get({
      success:function(res){
        console.log(res.data)
        name=res.data.user_name
        dangwei=res.data.user_dangWei
        branch=res.data.user_partyBranch
        belong=dangwei+branch
        console.log(name)
        console.log(belong)
        that.setData({
          user_name: name,
          user_belong: belong
        })
        
      }
    })
    
  },
  //去向支部选择器
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    this.setData({
      gotoDangwei: this.data.multiArray[0][this.data.multiIndex[0]],
      gotoBranch: this.data.multiArray[1][this.data.multiIndex[1]]
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['软件工程党支部','信息安全党支部'];
            break;
          case 1:
            data.multiArray[1] = ['计算机科学与技术党支部', '电子信息工程党支部', '电气工程党支部'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  //时间选择器
  bindchangeTime:function(e){
    this.setData({
      pickerTime:e.detail.value
    })
  },
  //原因
  blurReason:function(e){
    this.setData({
      reason:e.detail.value
    })
  },
  //提交按钮事件
  tapSubmit:function(e){
    let userID = app.globalData.user_number
    let userBranch = this.data.user_belong
    let gotoDangwei=this.data.gotoDangwei
    let gotoBranch=this.data.gotoBranch
    let date = this.data.pickerTime
    let reason=this.data.reason
    if(userID==''||userBranch==''){
      wx.showToast({
        title: '用户信息获取不成功',
        icon:'none',
        duration:1500
      })
    }else if(gotoBranch==''||gotoDangwei==''||date==''||reason==''){
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration:1500
      })
    }else{
      db.collection('inOut').add({
        data: {
          inOut_userID: userID,
          inOut_userBranch: userBranch,
          inOut_gotoDangwei: gotoDangwei,
          inOut_gotoBranch: gotoBranch,
          inOut_date: date,
          inOut_reason: reason,
          inOut_isPass: 0
        },
        success: function (res) {
          console.log("插入成功")
        }
      })
    }
    

  },

})