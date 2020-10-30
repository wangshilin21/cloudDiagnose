import versionUtil from './utils/version-util';
App({
  onLaunch: function() {
    // 检查更新
    versionUtil.checkUpdate();
  },

  globalData: {
   carType:'NULL',
   keyID:0,//当前使用的诊断头ID
   ecuID:'none',//当前操作的ECU名称
   ecuList:[],//返回该台车的控制器列表
   chooseFunc:0,
   globalUrl:'http://192.168.31.177:8080/CloudUDS/uds'
  }
});