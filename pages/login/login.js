
Page({
  data: {
     password:'',
     username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  inputUserName (e) {
    this.setData({
        username: e.detail.value
      });
  },
  inputPassword (e) {
    this.setData({
        password: e.detail.value
      });
  },
  login: function () {
    console.log(this.data.username);
    console.log(this.data.password);
    var userName = this.data.username;
    var userPassword = this.data.password;
    if(userName === '') {
      wx.showToast({
        title: '账号不能为空',
        duration: 2000
      });
      return;
    };
    if(userName != 'plee'||userPassword != 'plee'){
      wx.showToast({
        title: '账号密码错误',
        duration: 2000
      });
      return;
    };
    if(userPassword == '') {
      wx.showToast({
        title: '请输入密码',
        duration: 2000
      });
      return;
    }
    wx.switchTab({
      url: '../clientList/clientList',
    })
  },
  // 显示 toast
   /**
  onShowToastTap(e) {

    const type = e.currentTarget.dataset.type;
   // const config = JSON.parse(JSON.stringify(this.data.navConfig[type].config));
    this.setData({
      currentConf: config,
      type
    });
  },

  // 隐藏 toast
  onHideToastTap() {
    this.data.currentConf.status = false;
    this.setData({
      currentConf: this.data.currentConf
    });
  },

  onYzmTap() {
    wx.showToast({
      title: '更换验证码成功~',
      icon:'none'
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
});
