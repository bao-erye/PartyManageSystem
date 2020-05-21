//获取数据库实例
wx.cloud.init({env: "party-test-3q2zh"})
const db = wx.cloud.database({env: "party-test-3q2zh"})
Page({
  data: {
    //单选框内容
    arrayDangwei: ['软件学院党委', '计算机学院党委', '信息科学学院党委', '物理学院党委'],
    dangwei:'软件学院党委',
    //党支部数组
    arrayBranch: [],
  },

  onLoad: function (options) {
    var that=this
    db.collection('branch').get({
      success:function(res){
        that.setData({
          arrayBranch:res.data
        })
        console.log(that.data.arrayBranch)
      }
    })
  },
  //党委picker
  changeDangWei:function(e){
    var that=this
    this.setData({
      dangwei:this.data.arrayDangwei[e.detail.value]
    })
    db.collection('branch').where({
      branch_dangWei:that.data.dangwei
    }).get({
      success:function(res){
        that.setData({
          arrayBranch:res.data
        })
      }
    })
  },
  //添加支部
  tapAdd:function(e){
    wx.navigateTo({
      url: '/pages/manageMine/partyManage/addParty/addParty',
    })
  },
  //列表选择
  tapBranch:function(e){
    var branchID = this.data.arrayBranch[e.currentTarget.id]._id
    wx.navigateTo({
      url: '/pages/manageMine/partyManage/partyInfo/partyInfo?branch_id=' + branchID,
    })
  },
  //返回更新
  onShow:function(e){
    this.onLoad()
  }
  
})