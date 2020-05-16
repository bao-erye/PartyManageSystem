Page({


  data: {
    //picker
    yearArray:[2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
    yearIndex:0,
    monthArray:[1,2,3,4,5,6,7,8,9,10,11,12],
    monthIndex:0,
    //缴纳名单
    arrayPayed: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    //未缴纳名单
    arrayNopay: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
  },

  onLoad: function (options) {

  },
  //年份picker
  changeYear:function(e){
    this.setData({
      yearIndex:e.detail.value
    })
  },
  //月份picker
  changeMonth: function (e) {
    this.setData({
      monthIndex: e.detail.value
    })
  },
  //已缴纳tap
  tapPayed:function(e){

  },
  //未缴纳tap
  tapNopay:function(e){
    
  }

 
})