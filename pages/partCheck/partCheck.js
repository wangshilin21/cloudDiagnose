// pages/partCheck/partCheck.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecuName: 'Null',
    hasZDC: true,
    isPartCheckFinished: false,
    partNoSoll: '',
    partNoIst: '',
    softwareNoSoll: '',
    softwareNoIst: '',
    hardwareNoSoll: '',
    hardwareNoIst: '',
    partNoResult: 21, //零件号比对结果，默认不合格,0是NOK，1是OK
    softwareNoResult: 21, //软件版本比对结果，默认不合格
    hardwareNoResult: 21, //硬件版本比对结果，默认不合格
    zdcResult: 21 //ZDC比对结果，默认不合格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("ECU 的 ID是" + app.globalData.ecuID);
    that.setData({
      partNoIst: 'loading...',
      partNoSoll: 'loading...',
      partNoResult: 'loading...',
      softwareNoIst: 'loading...',
      softwareNoSoll: 'loading...',
      softwareNoResult: 'loading...',
      hardwareNoIst: 'loading...',
      hardwareNoSoll: 'loading...',
      hardwareNoResult: 'loading...'
    })
    this.setData({
        ecuName: app.globalData.ecuID
      }),
      wx.request({ //先给服务器发指令进行安装检测
        url: app.globalData.globalUrl,
        data: {
          function: 10,
          key: app.globalData.keyID,
          carType: app.globalData.carType,
          ecuName: app.globalData.ecuID
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          console.log(res.data.result);
          if (res.data.result == 0) {
            var i = setInterval(function () {

              if (that.data.isPartCheckFinished == false) {
                wx.request({ //轮询检测
                  url: app.globalData.globalUrl,
                  data: {
                    function: 110,
                    key: app.globalData.keyID,
                    ecuName: app.globalData.ecuID
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                  },
                  success: function (res) {
                    console.log(res.data.result);
                    if (res.data.result == 0) {
                      console.log("安装检测的返回数据是：");
                      console.log(res.data);
                      if (res.data.installationStatus.zdc == -2) {
                        that.setData({
                          hasZDC: false
                        })
                      }
                      if (res.data.installationStatus.zdc == 1 || res.data.installationStatus.zdc == 2 || res.data.installationStatus.zdc == -2) {
                        if (that.data.partNoIst == that.data.partNoSoll) {
                          that.setData({
                            partNoSoll: res.data.installationStatus.tnr.soll,
                            partNoIst: res.data.installationStatus.tnr.ist,
                            partNoResult: 1
                          })
                        }
                        if (that.data.partNoIst != that.data.partNoSoll) {
                          that.setData({
                            partNoSoll: res.data.installationStatus.tnr.soll,
                            partNoIst: res.data.installationStatus.tnr.ist,
                            partNoResult: 0
                          })
                        }
                        if (that.data.softwareNoIst == that.data.softwareNoSoll) {
                          that.setData({

                            softwareNoSoll: res.data.installationStatus.swv.soll,
                            softwareNoIst: res.data.installationStatus.swv.ist,
                            softwareNoResult: 1
                          })
                        }
                        if (that.data.softwareNoIst != that.data.softwareNoSoll) {
                          that.setData({

                            softwareNoSoll: res.data.installationStatus.swv.soll,
                            softwareNoIst: res.data.installationStatus.swv.ist,
                            softwareNoResult: 0
                          })
                        }
                        if (that.data.hardwareNoIst == that.data.hardwareNoSoll) {
                          that.setData({
                            hardwareNoSoll: res.data.installationStatus.hwv.soll,
                            hardwareNoIst: res.data.installationStatus.hwv.ist,
                            hardwareNoResult: 1
                          })
                        }
                        if (that.data.hardwareNoIst != that.data.hardwareNoSoll) {
                          that.setData({
                            hardwareNoSoll: res.data.installationStatus.hwv.soll,
                            hardwareNoIst: res.data.installationStatus.hwv.ist,
                            hardwareNoResult: 0
                          })
                        }
                        if (res.data.installationStatus.zdc == 1) {
                          that.setData({
                            zdcResult: 1
                          })
                        }
                        if (res.data.installationStatus.zdc == 2) {
                          that.setData({
                            zdcResult: 0
                          })
                        }
                        that.data.isPartCheckFinished = true;
                      }
                      ////在此处渲染前端界面                
                    }
                    if (res.data.result == 1) {
                      wx.hideLoading();
                      that.setData({
                        isPartCheckFinished: true
                      })
                      // wx.showModal({
                      //   title: '查询失败',
                      //   showCancel: false, //是否显示取消按钮
                      //   confirmText: "确定", //默认是“确定”
                      //   confirmColor: 'skyblue', //确定文字的颜色
                      //   success: function (res) {
                      //     if (res.cancel) {
                      //       //点击取消,默认隐藏弹框
                      //     } else {
                      //       //点击确定
                      //     }
                      //   },
                      //   fail: function (res) {}, //接口调用失败的回调函数
                      //   complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
                      // })
                    }
                  }
                })
              }
            }, 2000)
          }
          if (res.data.result == 1) {
            wx.hideLoading();
            wx.showModal({
              title: '诊断头状态异常',
              showCancel: false, //是否显示取消按钮
              confirmText: "确定", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                }
              },
              fail: function (res) {}, //接口调用失败的回调函数
              complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
        }
      })
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
  backToMenu: function (e) {
    wx.redirectTo({
      url: '../functiontest/functiontest',
    })
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