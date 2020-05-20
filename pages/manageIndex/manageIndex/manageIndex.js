var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    arrayUser: [],//群众信息数组
    arrayColor: ['#7D7272','#E71111'],//背景色数组
    //背景色index
    massColorIndex:1,
    activerColorIndex:0,
    developColorIndex:0,
    readyColorIndex:0,
    memberColorIndex:0,
    searchName:null,//姓名输入内容
    searchTele:null,//手机号输入内容
  },

  onLoad: function (options) {
    var that=this
    db.collection('user').where({
      user_status:0
    }).get({
      success:function(res){
        that.setData({
          arrayUser:res.data
        })
      }
    })

  },
  //群众tap
  tapMasses:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 1,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
    //获取群众信息
    var that = this
    db.collection('user').where({
      user_status: 0
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })

  },
  //入党积极分子tap
  tapActiver:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 1,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
    //获取信息
    var that = this
    db.collection('user').where({
      user_status: 1
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })
  },
  //发展对象tap
  tapDevelop:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 1,
      readyColorIndex: 0,
      memberColorIndex: 0,
    })
    //获取信息
    var that = this
    db.collection('user').where({
      user_status: 2
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })
  },
  //预备党员tap
  tapReady:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 1,
      memberColorIndex: 0,
    })
    //获取信息
    var that = this
    db.collection('user').where({
      user_status: 3
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })
  },
  //党员tap
  tapMember:function(){
    //换背景色，显示选中
    this.setData({
      massColorIndex: 0,
      activerColorIndex: 0,
      developColorIndex: 0,
      readyColorIndex: 0,
      memberColorIndex: 1,
    })
    //获取信息
    var that = this
    db.collection('user').where({
      user_status: 4
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })
  },
  //姓名输入失焦
  blurSearchName:function(e){
    this.setData({
      searchName:e.detail.value
    })
  },
  //电话输入失焦
  blurSearchTele:function(e){
    this.setData({
      searchTele: e.detail.value
    })
  },
  //搜索tap
  tapSearch:function(){
    //获取信息
    var that = this
    var name=this.data.searchName
    db.collection('user').where({
      user_name:name
    }).get({
      success: function (res) {
        that.setData({
          arrayUser: res.data
        })
      }
    })
  },
  //用户列表点击事件
  tapUser:function(e){
    var that=this
    var array=this.data.arrayUser
    let massIndex=this.data.massColorIndex
    let activerIndex=this.data.activerColorIndex
    let developIndex=this.data.developColorIndex
    let readyIndex=this.data.readyColorIndex
    let memberIndex=this.data.memberColorIndex
    var userID=array[e.currentTarget.id]._id
    console.log(userID)
    if(massIndex==1){
      wx.navigateTo({
        url: '/pages/manageIndex/masses/masses?userID='+userID,
      })
    }else if(activerIndex==1){
      wx.navigateTo({
        url: '/pages/manageIndex/activer/activer?userID='+userID,
      })
    }else if(developIndex==1){
      wx.navigateTo({
        url: '/pages/manageIndex/develop/develop?userID='+userID,
      })
    }else if(readyIndex==1){
      wx.navigateTo({
        url: '/pages/manageIndex/ready/ready?userID=' + userID,
      })
    }else if(memberIndex==1){
      wx.navigateTo({
        url: '/pages/manageIndex/member/member?userID=' + userID,
      })
    }


  
  }

  
})