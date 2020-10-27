// pages/components/view/pages/circle/index.js
var util = require ( '../../utils/util.js' );
Page({
  /**
   * 页面的初始数据
   */
  data: {
    percent: 0,
    openActive: true,
    activeColor: 'green',
    backgroundColor: '#7FFFAA',
    innerColor: '#E1FFFF',
    valueColor: 'black',
    outerDiameter: 220,
    innerDiameter: 170,
    backgroundImage: 'timg1.jpeg',
    duration: 100,
    ECUName:"MOT",
    flashTime:210000,//设定的flash时间，单位为ms
    setInter:'',
    isFlashing:false,
    title:"开始刷新"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log(faultDate)

    // var stime = Date.parse(new Date(faultDate));
    // var etime = Date.parse(new Date(completeTime));
    // var usedTime = etime - stime; //两个时间戳相差的毫秒数
    // console.log(usedTime)
  },


//隐藏的控件备份
//   <view class="button_list">
// 	<l-button l-class="button_class" plain="{{true}}" bind:tap="add">加</l-button>
// 	<l-button l-class="button_class" plain="{{true}}" bind:tap="min">减</l-button>
// </view>
// <l-loading class="loading" size="large" show="{{true}}" type="change"></l-loading>


  startFlash:function(){

    if(this.data.isFlashing==false){
      wx.showToast({
            title:"刷新即将开始",
            icon: 'loading',
            duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
            mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false 
            success:function(){},
            fail:function(){},
            complete:function(){}    
          })
    // this.data.startTime= util .formatTime ( new Date ());
    // console.log("start time is "+this.data.startTime)
    this.data.isFlashing=true;
    console.log(this.data.isFlashing)
    var that = this;
    let percent = this.data.percent;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
        function () {
          //console.log(that.data.isFlashing)
          if (percent > 100) {
            that.setData({
              title:"刷新完成"
            });
            return;
          } else {
            percent += 30;
            that.setData({
              percent
            });
          }
            //console.log(this.data.isFlashing);
        }
  , 2000)
      }
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

  },

  openCloseActive() {
    wx.redirectTo({
      url: '../circle/index',
    });
  },
return:function(){
  if(this.data.title=="开始刷新"){
    wx.showModal({
      title: '刷新中',
      content: '请勿退出',
      showCancel: false, //是否显示取消按钮
      confirmText: "OK", //默认是“确定”
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
  if(this.data.title=="刷新完成"){
  wx.redirectTo({
    url: '../functiontest/functiontest'
  });
}
},
  add() {
    let percent = this.data.percent;
    if (percent > 100) {
      return;
    } else {
      percent += 3;
      this.setData({
        percent
      });
    }
  },

  min() {
    let percent = this.data.percent;
    if (percent < 0) {
      return;
    } else {
      percent -= 3;
      this.setData({
        percent
      });
    }
  },

});
