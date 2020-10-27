var app = getApp()
Page({
  data: {
    ecuIndex: 0,
    config: [{
      icon: '/images/component/button.png',
      title: 'Null'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //////////////////////////////----For TEST-----??????????????????????????????
    console.log(app.globalData.ecuList)
    ////////////////////////////////////////???????????????????????????????????????
    var that = this;
    var i = 0;
    var newarray = new Array();
    that.setData({
      title: '诊断头ID：' + app.globalData.keyID,
    });
    for (i = 0; i < app.globalData.ecuList.length; i++) {
      newarray[i] = {
        icon: '/images/component/button.png',
        title: 'NULL',
      }
      newarray[i].title = app.globalData.ecuList[i].ecuName;
      that.setData({
        config: newarray
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toFuncList: function (e) {
    //console.log(e.target.id)
    var keyIndex = 0;
    keyIndex = parseInt(e.target.id);
    var i = 0;
    for (i = 0; i < app.globalData.ecuList.length; i++) {
      if (keyIndex == i) {
        app.globalData.ecuID = app.globalData.ecuList[i].ecuName
      }
    }
    console.log(app.globalData.ecuID);
    wx.navigateTo({
      url: '../functiontest/functiontest'
    });
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
});