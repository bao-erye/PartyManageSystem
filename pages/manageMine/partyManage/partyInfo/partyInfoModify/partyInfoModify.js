//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    branchID:'',
    branchName: '',
    arrayDangwei: ['软件学院党委', '计算机学院党委', '信息科学学院党委', '物理学院党委'],
    dangwei:'',
    adminName:'',
    adminTele:'',
    adminID:''
  },

  onLoad: function (options) {
    var that=this
    var branch_id = options.branchID
    that.setData({
      branchID:branch_id
    })
    db.collection('branch').doc(branch_id).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          branchName: res.data.branch_name,
          dangwei: res.data.branch_dangWei,
          adminName:res.data.branch_adminName,
          adminID:res.data.branch_adminID,
          adminTele:res.data.branch_adminTele
        })
        

      }
    })
  },
  //所属党委picker
  changeDangwei:function(e){
    this.setData({
      dangwei: this.data.arrayDangwei[e.detail.value]
    })
  },
  //form提交
  formSubmit:function(e){
    var that=this
    var branchID = that.data.branchID
    db.collection('branch').doc(branchID).update({
      data:{
        branch_name:e.detail.value.branchName,
        branch_dangWei:that.data.dangwei,
        branch_adminName:e.detail.value.adminName,
        branch_adminID:e.detail.value.adminID,
        branch_adminTele:e.detail.value.adminTele
      },success:function(res){
        console.log('修改成功')
        wx.showToast({
          title: '修改成功',
          icon:'none',
          duration:1500,
          complete:function(){
            wx.navigateBack({})
          }
        })
      }
    })

  }

})