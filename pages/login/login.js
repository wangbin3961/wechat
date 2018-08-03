Page({
  data: {
    text: "Page login"
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  /**
   * 注册
   */
  bindRegisterTap: function(e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  
  /**
   * 登录
   */
  bindLoginTap: function(e) {

  }
})