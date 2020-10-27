// pages/partCheck/partCheck.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ZDCStatus: 0,//影响前端显示。0：ZDC状态检查;1:ZDC核查中
    imageStatus:0,//控制插图切换效果
    ecuName: 'null',
    partNoSoll: '',
    partNoIst: '',
    softwareNoSoll: '',
    softwareNoIst: '',
    hardwareNoSoll: '',
    hardwareNoIst: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var i=0;
    this.setData({
      ecuName: app.globalData.ecuID
    });
    var i = setInterval(function () {
    console.log("test");
    i=i+1;
    i=i%4;
    that.setData({
      imageStatus:i
    })
    }, 400)
  },
  zdcCheck: function (e) {
    var that = this;
    this.setData({
      ZDCStatus: 1
    });

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