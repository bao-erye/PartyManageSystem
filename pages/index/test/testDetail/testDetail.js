// pages/index/test/testDetail/testDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testIndex:1,
    testTitle:'党的生日是哪一天？',
    arrayTestChoose: [{ name: 'A', value: '1972年10月1日' }, { name: 'B', value: '1972年10月1日' }, { name: 'C', value: '1972年10月1日' }, { name: 'D', value: '1972年10月1日' }],

  },
  //单选框选中事件
  bindchange:function(e){
    console.log(e);
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