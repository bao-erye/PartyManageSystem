//获取数据库实例
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({
  data: {
    arrayDangwei: ['软件学院党委', '计算机学院党委', '信息科学学院党委', '物理学院党委'],
    dangwei:'',
  },

  onLoad: function (options) {

  },
  //党委picker
  changeDangwei:function(e){
    this.setData({
      dangwei:this.data.arrayDangwei[e.detail.value]
    })
  },
  //表单提交
  formSubmit:function(e){
    var that=this
    let branchName = e.detail.value.branchName
    let dangwei=that.data.dangwei
    let adminName = e.detail.value.adminName
    let adminTele = e.detail.value.adminTele
    let adminID=e.detail.value.adminID
    if(branchName==''||dangwei==''||adminName==''||adminTele==''||adminID==''){
      wx.showToast({
        title: '输入不能为空',
        icon:'none',
        duration:1500
      })
    }else{
      db.collection('branch').add({
        data:{
          branch_name:branchName,
          branch_dangWei:dangwei,
          branch_adminName:adminName,
          branch_adminTele:adminTele,
          branch_adminID:adminID,
        },success:function(res){
          console.log('成功添加支部')
          wx.showToast({
            title: '成功添加支部',
            icon:'none',
            duration:1500,
            complete:function(){
              wx.navigateBack({})
            }
          })
        }
      })
    }
  }
})