var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    adminBranch:'',//管理员所在支部
    arrayUntreated:[],//未处理列表
    arrayTreated: [],
  },

  onLoad: function (options) {
    var that=this
    var adminBranch = options.adminBranch
    var arrayUntreated=this.data.arrayUntreated
    var arrayTreated=this.data.arrayTreated
    this.setData({
      adminBranch:adminBranch
    })
    const _=db.command
    //获取转入转出对象列表
    db.collection('inOut').where(_.or([
      {
        inOut_userBranch:adminBranch
    },{
      inOut_gotoBranch:adminBranch
    }
    ])).get({
      success:function(res){
        var array=res.data
        console.log(res.data)
        var i=0
        for(i;i<array.length;i++){
          if(array[i].inOut_affirm.length==2){
            arrayTreated.push(array[i])//确认两次的转入转出即为已处理
          }else{
            arrayUntreated.push(array[i])//确认次数不及2次的转入转出即为未处理
          }
        }
        that.setData({
          arrayUntreated:arrayUntreated,
          arrayTreated:arrayTreated
        })
      }
    })
  },
  //待处理事件处理
  tapUntreated:function(e){
    var inoutID = this.data.arrayUntreated[e.currentTarget.id]._id
    console.log(inoutID)
    wx.navigateTo({
      url: '/pages/manageMine/manageInout/inoutDeal/inoutDeal?inoutID=' + inoutID,
    })
  },
  //已处理事件详情
  tapTreated:function(e){
    var inoutID = this.data.arrayTreated[e.currentTarget.id]._id
    wx.navigateTo({
      url: '/pages/manageMine/manageInout/inoutDetail/inoutDetail?inoutID='+inoutID,
    })
  },
  onShow: function () {
    //返回刷新
    this.refresh()
  },
  //刷新方法
  refresh:function(e){
    //清空旧数组
    this.setData({
      arrayTreated:[],
      arrayUntreated:[]
    })
    var that=this
    var adminBranch = this.data.adminBranch
    var arrayUntreated=this.data.arrayUntreated
    var arrayTreated=this.data.arrayTreated
    const _=db.command
    //获取转入转出对象列表
    db.collection('inOut').where(_.or([
      {
        inOut_userBranch:adminBranch
    },{
      inOut_gotoBranch:adminBranch
    }
    ])).get({
      success:function(res){
        var array=res.data
        console.log(res.data)
        var i=0
        for(i;i<array.length;i++){
          if(array[i].inOut_affirm.length==2){
            arrayTreated.push(array[i])//确认两次的转入转出即为已处理
          }else{
            arrayUntreated.push(array[i])//确认次数不及2次的转入转出即为未处理
          }
        }
        that.setData({
          arrayUntreated:arrayUntreated,
          arrayTreated:arrayTreated
        })
      }
    })
  }

 
})