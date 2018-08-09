const app = getApp();

Page({
  data: {
    userInfo: {},
    isLogin: false //登录状态
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // if (!that.data.isLogin) {
    //   wx.navigateTo({
    //     url: '../login/login'
    //   });
    // }
    console.info(app.globalData.userInfo);
  },

  onShow: function() {
    this.setData({
      isLogin: app.globalData.isLogin,
      disabled: !app.globalData.isLogin,
      userInfo: app.globalData.userInfo
    });
  },

  bindLoginTap: function(e) {
    wx.navigateTo({
      url: '../login/login'
    });
  },

  /** 查看个人信息 */
  bindViewUserInfoTap: function(e) {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    wx.navigateTo({
      url: './userInfo/userInfo',
    })
  },

  /** 预约记录 */
  bindViewAppointmentsTap: function(e) {
    console.info(this.data);
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    wx.navigateTo({
      url: './appointments/appointments',
    })
  },

  /** 我的订单 */
  bindViewOrderTap: function (e) {
    console.info(this.data);
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    wx.navigateTo({
      url: './orderList/orderList',
    })
  },

  bindViewCarTap: function(e) {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    wx.navigateTo({
      url: './car/car',
    })
  },

  bindLogoutTap: function(e) {
    //清除用户登录态信息
    app.globalData.userInfo = {};
    app.globalData.isLogin = false;
    //跳转到登录页
    wx.navigateTo({
      url: '../login/login',
    })
  }
})