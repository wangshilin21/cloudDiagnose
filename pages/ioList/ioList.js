// pages/layout/pages/grid/index.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    keyInfo: '',
    trunkStatus: false,//判断后备箱状态，默认不开启
    lowBeamStatus: false,//判断近光灯状态，默认不开启
    highBeamStatus: false,//判断远光灯状态，默认不开启
    alarmStatus: false,//判断双闪灯状态，默认不开启
    FLStatus: false,//判断左前车窗状态，默认不开启
    FRStatus: false,//判断右前车窗状态，默认不开启
    RLStatus: false,//判断左后车窗状态，默认不开启
    RRStatus: false,//判断右后车窗状态，默认不开启
    allWindowStatus: false,//判断全部车窗状态，默认不开启
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
  hornTest: function () {//喇叭测试 
    app.globalData.carType = 'VW416';
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 4,
        key: 123,
        carType: app.globalData.carType
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        console.log("喇叭测试返回值是"+res.data);
        if (res.data.result == 0) {
          wx.hideLoading();
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  trunkTest(e) {//后备箱开启 
    this.data.trunkStatus = e.detail.value;
    //console.log(this.data.trunkStatus);
    var trunkAction = 21;
    var that = this;
    if (this.data.trunkStatus == true) {//打开后备箱
      trunkAction = 0;
    }
    if (this.data.trunkStatus == false) {//关闭后备箱
      trunkAction = 1;
    }

    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 8,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: trunkAction
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            trunkStatus: !that.data.trunkStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  switchClient:function(e){
    console.log("SWITCH");
    app.globalData.chooseFunc=0;
    wx.reLaunch({
      url: '../clientList/clientList',
    })
    },
  lowBeamTest(e) {//近光灯开启 
    this.data.lowBeamStatus = e.detail.value;
    //console.log(this.data.lowBeamStatus);
    var lowBeamAction = 21;
    var that = this;
    if (this.data.lowBeamStatus == true) {//打开近光灯
      lowBeamAction = 0;
    }
    if (this.data.lowBeamStatus == false) {//关闭近光灯
      lowBeamAction = 1;
    }

    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 6,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: lowBeamAction
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        console.log("近光灯返回值是"+res.data);
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            lowBeamStatus: !that.data.lowBeamStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },

  highBeamTest(e) {//远光灯开启 
    this.data.highBeamStatus = e.detail.value;
    //console.log(this.data.highBeamStatus);
    var highBeamAction = 21;
    var that = this;
    if (this.data.highBeamStatus == true) {//打开远光灯
      highBeamAction = 0;
    }
    if (this.data.highBeamStatus == false) {//关闭远光灯
      highBeamAction = 1;
    }

    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 7,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: highBeamAction
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        console.log("远光灯返回值是"+res.data);
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            highBeamStatus: !that.data.highBeamStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },

  alarmTest(e) {//双闪灯开启 
    this.data.alarmStatus = e.detail.value;
    //console.log(this.data.alarmStatus);
    var alarmAction = 21;
    var that = this;
    if (this.data.alarmStatus == true) {//打开双闪灯
      alarmAction = 0;
    }
    if (this.data.alarmStatus == false) {//关闭双闪灯
      alarmAction = 1;
    }

    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 5,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: alarmAction
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        console.log("双闪灯返回值是"+res.data);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            alarmStatus: !that.data.alarmStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  FLSwitch(e) {//左前车窗开启 
    console.log("左前");
    this.data.FLStatus = e.detail.value;
    //console.log(this.data.FLStatus);
    var FLAction = 21;
    var that = this;
    if (this.data.FLStatus == true) {//打开左前车窗
      FLAction = 0;
    }
    if (this.data.FLStatus == false) {//关闭左前车窗
      FLAction = 1;
    }
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 5,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: FLAction,
        position: 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            FLStatus: !that.data.FLStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  FRSwitch(e) {//右前车窗开启 
    console.log("右前");
    this.data.FRStatus = e.detail.value;
    //console.log(this.data.FRStatus);
    var FRAction = 21;
    var that = this;
    if (this.data.FRStatus == true) {//打开右前车窗
      FRAction = 0;
    }
    if (this.data.FRStatus == false) {//关闭右前车窗
      FRAction = 1;
    }
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 5,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: FRAction,
        position: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            FRStatus: !that.data.FRStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  RLSwitch(e) {//左后车窗开启 
    console.log("左后");
    this.data.RLStatus = e.detail.value;
    //console.log(this.data.RLStatus);
    var RLAction = 21;
    var that = this;
    if (this.data.RLStatus == true) {//打开左后车窗
      RLAction = 0;
    }
    if (this.data.RLStatus == false) {//关闭左后车窗
      RLAction = 1;
    }
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 5,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: RLAction,
        position: 2
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            RLStatus: !that.data.RLStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  RRSwitch(e) {//右后车窗开启 
    console.log("右后");
    this.data.RRStatus = e.detail.value;
    //console.log(this.data.RRStatus);
    var RRAction = 21;
    var that = this;
    if (this.data.RRStatus == true) {//打开右后车窗
      RRAction = 0;
    }
    if (this.data.RRStatus == false) {//关闭右后车窗
      RRAction = 1;
    }
    wx.request({
      url: app.globalData.globalUrl,
      data: {
        function: 5,
        key: app.globalData.keyID,
        carType: app.globalData.carType,
        action: RRAction,
        position: 3
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.showLoading({
          title: 'loading',
        })
        // console.log(res.data.result);
        if (res.data.result == 0) {
          wx.hideLoading();
        }
        if (res.data.result == 1) {//诊断头异常
          wx.hideLoading();
          that.setData({
            RRStatus: !that.data.RRStatus
          })
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
            fail: function (res) { }, //接口调用失败的回调函数
            complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
  },
  allWindowSwitch(e) {//全部车窗开启 
    this.data.allWindowStatus = e.detail.value;
    var action = 21;
    var errorMark = false;//是否弹出异常
    var errorTime = 0;//弹出错误的次数
    var that = this;
    if (this.data.allWindowStatus == true) {//打开全部车窗
      action = 0;
    }
    if (this.data.allWindowStatus == false) {//关闭全部车窗
      action = 1;
    }
      wx.request({//0
        url: app.globalData.globalUrl,
        data: {
          function: 5,
          key: app.globalData.keyID,
          carType: app.globalData.carType,
          action: action,
          position: 0
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // wx.showLoading({
          //   title: 'loading',
          // })
          // console.log(res.data.result);
          if (res.data.result == 0) {
            console.log("0")
          }
          if (res.data.result == 1) {//诊断头异常
            console.log("0")
            errorMark = true;
            errorTime = errorTime+1;
            console.log("error Time is "+ errorTime);
          }
          if (errorMark == true && errorTime<2) {
            wx.hideLoading();
            that.setData({
              allWindowStatus: !that.data.allWindowStatus
            })
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
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
          if (errorMark == false) {
            wx.hideLoading();
            console.log("Success");
          }
        }
      });
      wx.request({//1
        url: app.globalData.globalUrl,
        data: {
          function: 5,
          key: app.globalData.keyID,
          carType: app.globalData.carType,
          action: action,
          position: 1
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // wx.showLoading({
          //   title: 'loading',
          // })
          // console.log(res.data.result);
          if (res.data.result == 0) {
            console.log("1")
          }
          if (res.data.result == 1) {//诊断头异常
            console.log("1")
            errorMark = true;
            errorTime = errorTime+1;
            console.log("error Time is "+ errorTime);
          }
          if (errorMark == true && errorTime<2) {
            wx.hideLoading();
            that.setData({
              allWindowStatus: !that.data.allWindowStatus
            })
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
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
          if (errorMark == false) {
            wx.hideLoading();
            console.log("Success");
          }
        }
      });
      wx.request({//2
        url: app.globalData.globalUrl,
        data: {
          function: 5,
          key: app.globalData.keyID,
          carType: app.globalData.carType,
          action: action,
          position: 2
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // wx.showLoading({
          //   title: 'loading',
          // })
          // console.log(res.data.result);
          if (res.data.result == 0) {
            console.log("2")
          }
          if (res.data.result == 1) {//诊断头异常
            console.log("2")
            errorMark = true;
            errorTime = errorTime+1;
            console.log("error Time is "+ errorTime);
          }
          if (errorMark == true && errorTime<2) {
            wx.hideLoading();
            that.setData({
              allWindowStatus: !that.data.allWindowStatus
            })
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
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
          if (errorMark == false) {
            wx.hideLoading();
            console.log("Success");
          }
        }
      });
      wx.request({//3
        url: app.globalData.globalUrl,
        data: {
          function: 5,
          key: app.globalData.keyID,
          carType: app.globalData.carType,
          action: action,
          position: 3
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // wx.showLoading({
          //   title: 'loading',
          // })
          // console.log(res.data.result);
          if (res.data.result == 0) {
            console.log("3")
          }
          if (res.data.result == 1) {//诊断头异常
            console.log("3")
            errorMark = true;
            errorTime = errorTime+1;
            console.log("error Time is "+ errorTime);
          }
          if (errorMark == true && errorTime<2) {
            wx.hideLoading();
            that.setData({
              allWindowStatus: !that.data.allWindowStatus
            })
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
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
          if (errorMark == false) {
            wx.hideLoading();
            console.log("Success");
          }
        }
      });


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



var p1 = new Promise(function (resolve, reject) {

})