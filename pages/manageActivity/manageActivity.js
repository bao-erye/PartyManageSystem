//云数据库初始化
wx.cloud.init({ env: "party-test-3q2zh" })
const db = wx.cloud.database({ env: "party-test-3q2zh" })
Page({

  data: {
    //单选框内容
    arrayAcademy: ['软件学院', '计算机学院', '信息科学学院', '物理学院'],
    acBelong: '软件学院',
    arrayObject: ['入党申请人', '入党积极分子', '发展对象', '预备党员', '正式党员'],
    acObject: '入党申请人',
    statusArray: ['确认中', '签到中', '进行中'],
    acStatus: '确认中',
    //活动对象数组
    arrayActivity: [],
  },
  onLoad: function (options) {
    var that=this
    db.collection('activity').get({
      success:function(res){
        console.log(res.data)
        that.setData({
          arrayActivity:res.data
        })
      }
    })

  },

  
  //学院选择器
  bindPickerChangeXueyuan: function (e) {
    this.setData({ acBelong: this.data.arrayAcademy[e.detail.value] });
    var that = this;
    //获取活动对象
    db.collection('activity').where({
      activity_issuer: that.data.acBelong
    }).get({
      success: function (res) {
        that.setData({
          arrayActivity: res.data
        })
      }
    })
  },
  //对象选择器
  bindPickerChangeType: function (e) {
    this.setData({ acObject: this.data.arrayObject[e.detail.value] });
    var that = this;
    //获取活动对象
    db.collection('activity').where({
      activity_object: that.data.acObject
    }).get({
      success: function (res) {
        that.setData({
          arrayActivity: res.data
        })
      }
    })
  },
  //状态选择器
  bindPickerChangeStatus: function (e) {
    this.setData({ acStatus: this.data.statusArray[e.detail.value] });
  },
  //点击列表事件
  tapActivity: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/manageActivity/editActivity/editActivity?activity_id=' + that.data.arrayActivity[e.currentTarget.id]._id,
    })
  },
  //新建活动
  tapAdd: function () {
    wx.navigateTo({
      url: '/pages/manageActivity/addActivity/addActivity',
    })
  },

 
  

  
})