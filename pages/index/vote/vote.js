// pages/index/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayChoose: [{ name: 'A', value: '同意' }, { name: 'B', value: '不同意' }, { name: 'C', value: '放弃' }, { name: 'D', value: '无' }],
    voteTitle:'是否同意给***同志的奖励通告',

  },
  //投票选项
  bindchange:function(e){
    console.log(e.detail.value);
  },
  //确认投票按钮
  btnVote:function(e){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})