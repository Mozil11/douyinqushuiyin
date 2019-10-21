App({
  onLaunch: function () {
    var n = this, s = wx.getStorageSync("logs") || [];
    s.unshift(Date.now()), wx.setStorageSync("logs", s), wx.login({
      success: function (n) { }
    }), wx.getSetting({
      success: function (s) {
        s.authSetting["scope.userInfo"] && wx.getUserInfo({
          success: function (s) {
            n.globalData.userInfo = s.userInfo, n.userInfoReadyCallback && n.userInfoReadyCallback(s);
          }
        });
      }
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    default: 'https://v.ataobao.vip/api/'
  }
});
