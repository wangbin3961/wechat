const app = getApp();
const API = require('../../utils/api.js')

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
  login: function(e) {
    var formData = e.detail.value;
    console.info(formData);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        formData.code = res.code;
        formData.loginName = formData.username;

        API.login("POST", formData, function(res) {
          console.log(res);
          if (res.data) {
            // 登录成功，保存用户信息
            app.globalData.isLogin = true;
            app.globalData.userInfo = res.data;
            wx.navigateBack({
            });
            // TODO 自定义登录态 微信登录态失效处理
          } else {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none',
              mask: true
            })
          }


        });

      }
    })


  }
})