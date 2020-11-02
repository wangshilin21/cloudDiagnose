//index.js
//import naviConfigs from './navi.js';
var app = getApp()
Page({
  data: {
    //naviConfigs: naviConfigs,
    index: 0, //pdx选择菜单的下拉角标
    test: 0,
    chooseFunc: 0, //选择是IO控制还是ECU操作,0为诊断头选择界面，1为ECU/IO控制界面选择
    array: ['VW416', 'AU371', 'VW481', 'VW371'], //定义实际的PDX类型
    pdxNow: '请选择',
    buttonIndex: 0,
    pdxNowTemp: '请选择', //作为中间值为pdxNow传递变量
    naviConfig: "",
    resData: {},
    setInter: '',
    baseConfig: [],
    shopConfig: [{
      icon: '/images/navigator/icon-shop.png',
      //navigateMark: 'shopping'
    }]

  },
  bindPickerChange: function (e) { //PDX选择触发事件

    this.data.pdxNow = this.data.array[this.data.index]
    this.setData({
      index: e.detail.value,
    });
    this.data.pdxNowTemp = this.data.array[this.data.index]
    this.setData({
      pdxNow: this.data.pdxNowTemp
    })
    console.log("当前车型代码为" + this.data.pdxNow)
    app.globalData.carType = this.data.pdxNow;
    console.log(app.globalData.carType)

  },
  checkClientStatus: function (e) { //检查当前诊断头状态，定时查询
    var that = this;
    var i = 0;
    var requestCount=0;
    var clientNumber = 0;
    var newarray = new Array();
    //console.log(e.target)
    if(app.globalData.carType=='NULL'){
      wx.showModal({
        title: '请先选择车型代码',
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
      return;
    }
    if(app.globalData.carType!='NULL'){
    that.data.setInter = setInterval(
      function () {
        wx.request({
          url: app.globalData.globalUrl,
          data: {
            function: 101,
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success: function (res) {
            //console.log("返回的数据是："+res.data.function);
            that.data.resData = res.data;
            //console.log(that.data.resData);
            requestCount=requestCount+1;
            //console.log("诊断头请求次数："+requestCount);
            clientNumber = that.data.resData.keyList.length;
            //console.log(clientNumber);
            for (i = 0; i < clientNumber; i++) {
              newarray[i] = {
                icon: '/images/navigator/icon-action.png',
                title: "987654321",
                navigateMark: 'eculist'
              }
              newarray[i].title = "诊断头ID：" + that.data.resData.keyList[i].key;
              that.setData({
                baseConfig: newarray
              })
              // console.log(that.data.resData);
              let count = 0;
              for (count = 0; count < that.data.baseConfig.length; count = count + 1) {
                let status = "baseConfig[" + count + "].icon"
                //console.log("Key Status is "+that.data.resData.keyList[count].locked);
                if (that.data.resData.keyList[count] != null) { ////仅供测试，不知是否有效
                   //            console.log(count+"诊断头图标状态是："+that.data.resData.keyList[count].locked);
                  if (that.data.resData.keyList[count].locked == false) {
                    that.setData({
                      [status]: '/images/navigator/icon-action.png'
                    })
                  }
                  if (that.data.resData.keyList[count].locked == true) {
                    that.setData({
                      [status]: '/images/navigator/no.png'
                    })
                  }
                }
              }
            }
          },
        })
      }, 1000)
    }
    //////////////以上为获取诊断头列表/////////////////////

    // this.setData({
    //   chooseFunc: 0
    // });

    //以上为判断诊断头是否可用

  },
  ecuConfig: function (e) {
    //console.log("ecu Config")
    var title = this.data.baseConfig.title;
    var navigatemark = this.data.baseConfig.title;
    wx.navigateTo({
      url: '../ecuList/ecuList'
      //url: '/pages/navigator/content/index?title=' + title + '&navigatemark=' + navigatemark
    });

  },
  ioControl: function (e) { //进入IO控制界面
    console.log(" IO Control")
    wx.navigateTo({
      url: '../ioList/ioList'
      //url: '/pages/navigator/content/index?title=' + title + '&navigatemark=' + navigatemark
    });
  },
  onHide: function () {
    clearInterval(this.data.setInter)
    console.log("执行了OnHide")
  },
  onLoad: function () {
  var that=this;
  },
  onUnload: function () {
    clearInterval(that.data.setInter);
    console.log("执行了OnUnload")
    app.globalData.chooseFunc=0;
    this.setData({
      chooseFunc: app.globalData.chooseFunc
    });

  },
  onShareAppMessage() {

  },

  onNaviCard(e) { //跳转到某个诊断头的界面
    var count = 0;
    var that = this;
    var keyIndex = 0;
    keyIndex = parseInt(e.target.id);
    for (count = 0; count < this.data.baseConfig.length; count++) {
      if (e.target.id == count) {
        //console.log(that.data.resData.keyList[0].locked);
        if (that.data.resData.keyList[count].locked == false) { //诊断头可用，锁定诊断头,action 0为解锁，1为上锁
          app.globalData.keyID = that.data.resData.keyList[keyIndex].key; //当前正在操作的Key
          wx.request({
            url: app.globalData.globalUrl,
            data: {
              function: 1,
              key: app.globalData.keyID,
              carType: app.globalData.carType,
              action: 1
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success: function (res) {
              console.log("锁定诊断头返回值为" + res.data.result);
              ///++++++++++++++++++++++++++++ To be fixed;
              if (res.data.result == 0) { //锁定成功，返回ecuList
                app.globalData.ecuList = res.data.ecuList;
              }
              if (res.data.result == 1 || res.data.result == 2) {
                console.log("对用户进行异常提示");
              }
            },
          })
          app.globalData.chooseFunc=1;
          that.setData({
            chooseFunc: app.globalData.chooseFunc
          });
        }
        if (that.data.resData.keyList[count].locked == true) { //诊断头不可用，弹出异常
          wx.showModal({
            title: '诊断头不可用',
            content: '请选择其他诊断头',
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
          return;
        }
      }
    }


    // wx.navigateTo({
    //         url: '../selection/selection'
    //         //url: '/pages/navigator/content/index?title=' + title + '&navigatemark=' + navigatemark
    //       });

    //     let {
    //       title,
    //       navigatemark
    //     } = e.target.dataset;
    //     /*   if(navigatemark=='shopping'){
    //       wx.navigateTo({
    //         url: '../ecuList/ecuList',
    //       })
    // }*/
    //     wx.navigateTo({
    //       url: '../ecuList/ecuList?title=' + title + '&navigatemark=' + navigatemark,
    //       //url: '/pages/navigator/content/index?title=' + title + '&navigatemark=' + navigatemark
    //     });
    //     console.log("Title is " + title);
    //     console.log(navigatemark);
    //     console.log('../ecuList/ecuList?title=' + title + '&navigatemark=' + navigatemark);
  },
});