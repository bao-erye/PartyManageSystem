var app = getApp()
//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    branchID:'',
    branchName:"",
    branch_adminName:'',
    branch_adminTele:'',
    branch_dangwei:'',
    arrayMember: []//支部成员数组
  },
  onLoad: function (options) {
    var that=this
    var branch_id = options.branch_id
    that.setData({
      branchID:branch_id
    })
    //获取支部信息
    db.collection('branch').doc(branch_id).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          branchName:res.data.branch_name,
          branch_adminName:res.data.branch_adminName,
          branch_adminTele:res.data.branch_adminTele,
          branch_dangwei:res.data.branch_dangWei
        })
        //获取支部成员信息
        db.collection('user').where({
          user_dangWei: res.data.branch_dangWei,
          user_partyBranch: res.data.branch_name,
          user_status: 4
        }).get({
          success: function (res) {
            console.log(res.data)
            that.setData({
              arrayMember:res.data
            })
          }
        })

      }
    })
    
  },
  //修改支部信息
  tapInfo:function(e){
    var branchID = this.data.branchID
    console.log(branchID)
    wx.navigateTo({
      url: '/pages/manageMine/partyManage/partyInfo/partyInfoModify/partyInfoModify?branchID='+branchID,
    })
  },
  onShow:function(e){
    var branch_id=this.data.branchID
    var that=this
    //更新支部信息
    db.collection('branch').doc(branch_id).get({
      success: function (res) {
        that.setData({
          branchName: res.data.branch_name,
          branch_adminName: res.data.branch_adminName,
          branch_adminTele: res.data.branch_adminTele,
          branch_dangwei: res.data.branch_dangWei
        })
      }
    })
  },
  //党支部成员列表点击
  tapMember:function(e){
    var that=this
    var userID = that.data.arrayMember[e.currentTarget.id]._id
    console.log(userID)
    wx.navigateTo({
      url: '/pages/manageIndex/member/member?userID='+userID,
    })
  }

})