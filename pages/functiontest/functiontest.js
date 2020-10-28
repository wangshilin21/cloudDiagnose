// pages/layout/pages/list/index.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    keyInfo:''

  },

  clickListItem(e){
    wx.showToast({
      title: `点击了${e.currentTarget.dataset.key}`,
      icon:'none'
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    this.setData({
      keyInfo: '诊断头ID：'+app.globalData.keyID,
    });
    console.log("Key ID IS " +app.globalData.keyID)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },
  switchClient:function(e){
  console.log("SWITCH");
  app.globalData.chooseFunc=0;
  wx.reLaunch({
    url: '../clientList/clientList',
  })
  },
  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
});
