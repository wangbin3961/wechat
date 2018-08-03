const app = getApp();

Page({
  data: {
    isLogin: false, //登录状态
    userInfo: {}
  },
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (!that.data.loginIn) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
  },
  onShow: function() {
    this.setData({
      isLogin: app.globalData.isLogin
    })
  },
  bindLoginTap: function(e) {
    wx.navigateTo({
      url: '../login/login'
    });
  }
})