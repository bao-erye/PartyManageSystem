// pages/index/inAndOut/inAndOut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'王晨宝',
    belong:'软件学院党委软件工程党支部',
    gotoAcademyArray: ['软件学院', '计算机学院', '信息科学学院', '物理学院'],
    gotoAcademyIndex:0,
    gotoMajorArray:['软件工程','信息安全'],
    gotoMajorIndex:0,

    timePicked:'',

  },

  //选择器函数
  bindPickerGotoAcademy:function(e){
    this.setData({gotoAcademyIndex:e.detail.value});
  },
  bindPickerGotoMajor:function(e){
    this.setData({gotoMajorIndex: e.detail.value});
  },
  bindchangeTime:function(e){
    this.setData({timePicked:e.detail.value});
  },
  //提交按钮事件
  formSubmit:function(e){

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