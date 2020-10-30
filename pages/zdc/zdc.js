// pages/partCheck/partCheck.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ZDCStatus: 0, //影响前端显示。0：ZDC状态检查;1:ZDC核查中;2,ZDC状态检查完成
    ZDCWriteResult: 0, //ZDC写入的状态，0：未开始；1：进行中；2：ZDC写入完成
    imageStatus: 0, //控制插图切换效果
    ecuName: 'null',
    isZDCFinished: false, //判定写ZDC是否结束
    isZDCCheckFinished: false, //判定查询ZDC是否结束
    isZDCCheckInfo:false,
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
    var i = 0;
    this.setData({
      ecuName: app.globalData.ecuID
    });
    var i = setInterval(function () {
      // console.log("test");
      i = i + 1;
      i = i % 4;
      that.setData({
        imageStatus: i
      })
    }, 400)
  },
  zdcCheck: function (e) {
    var that = this;
    this.setData({
      ZDCStatus: 1
    });
    // console.log("ZDC Status is " + that.data.ZDCStatus);
    var i = setInterval(function () {
      if (that.data.isZDCCheckFinished == false) {
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
              if (res.data.installationStatus.zdc == 1) {
                // wx.showModal({
                //   title: 'ZDC编码已完成',
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
                that.setData({
                  isZDCCheckFinished: true,
                  ZDCStatus: 2
                })

              }
              if (res.data.installationStatus.zdc == 2) {
                // wx.showModal({
                //   title: '控制器需要进行编码',
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
                that.setData({
                  isZDCCheckFinished: true,
                  ZDCStatus: 3
                })

              }
            }
            if (res.data.result == 1) {
              wx.showModal({
                title: '查询失败',
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
      }
    }, 2000)
  },
  zdcWrite: function (e) {
    var that = this;
    that.setData({
      ZDCWriteResult: 1
    });
    wx.request({ //先发送ZDC写入指令
      url: app.globalData.globalUrl,
      data: {
        function: 3,
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
        if (res.data.result == 0) { //zdc写入正常进行
          var j = setInterval(function () {

            if (that.data.isZDCFinished == false) {
              wx.request({ //轮询检测
                url: app.globalData.globalUrl,
                data: {
                  function: 103,
                  key: app.globalData.keyID,
                  ecuName: app.globalData.ecuID
                },
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                success: function (res) {
                  if (res.data.result == 1) {
                    // wx.showModal({
                    //   title: 'ZDC写入成功',
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
                    that.setData({
                      isZDCFinished: true,
                      ZDCWriteResult: 2
                    })
                    if(that.data.isZDCCheckInfo==false){
                      wx.showModal({
                        title: 'ZDC写入已完成',
                        content: '请进行ZDC校验',
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
                      that.setData({
                        isZDCCheckFinished:true
                      })
                    }
                  }
                  if (res.data.result == 2) {
                    // wx.showModal({
                    //   title: 'ZDC写入失败',
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
                    that.setData({
                      isZDCFinished: true,
                      ZDCWriteResult: 3
                    })
                  }
                }
              })
            }
          }, 2000)
        }
        if (res.data.result == 1) {
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
          });
          that.setData({
            isZDCFinished: true,
            ZDCWriteResult: 3
          })
        }
      }
    })
  },
  return: function(e) {
    if (this.data.isZDCFinished == true) {
      wx.navigateBack({
        url: '../functiontest/functiontest',
      })
    }
    if (this.data.isZDCFinished == false) {
      wx.showModal({
        title: '请勿退出',
        content: 'ZDC写入正在进行中',
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
    return;
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