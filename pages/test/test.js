// pages/layout/pages/grid/index.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    keyInfo: '',
    grids2: [{
      image: 'cart',
      text: '我的购物车'
    }]
  },

  clickGrid(e) {
    wx.showToast({
      title: e.detail.cell.text,
      icon: 'none'
    });
  },
  test(e) {
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 1,
        key:16,
        carType: "VW416",
        action:0
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.request({
          url: app.globalData.globalUrl,
          data: {
            function: 110,
            key:16,
            ecuName:"GWA"
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success: function (res) {
          console.log(res.data);
          if (res.data.result == 1){
            console.log("失败啦")
          }
          if (res.data.result == 0){
            console.log("成功啦")
          }
          }
        })
        console.log("时序标签")
      }
    })
  },
  clickGrids(e) {
    wx.showToast({
      title: `点击的Grid的索引是${e.detail.index}`,
      icon: 'none'
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    this.setData({
      keyInfo: '诊断头ID：' + app.globalData.keyID
    })
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
