// pages/register/register.js
const API = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    isPassword: true,
    countdown: 60,
    countText: "发送验证码",
    disableBtn: true,
    showCountdown: false,
    showTopTips: false,
    topTips: "输入错误"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  bindTogglePwd: function(e) {
    this.setData({
      isPassword: !this.data.isPassword
    })
  },

  bindPhoneBlur: function(e) {
    let that = this;
    if (e.detail.value.length === 11) {
      let val = this.checkPhoneNum(e.detail.value);
      console.info(val);
      if (val) {
        if (this.data.showCountdown == false) {
          this.setData({
            disableBtn: false,
            showTopTips: false
          })
        }
      } else {
        this.setData({
          disableBtn: true,
          showTopTips: true,
          topTips: "手机号码格式错误"
        })
        setTimeout(function() {
          that.setData({
            showTopTips: false
          });
        }, 3000);
      }
    } else {
      this.setData({
        disableBtn: true,
        showTopTips: true,
        topTips: "请填写11位手机号码"
      })
      setTimeout(function() {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
  },
  checkPhoneNum: function(phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: './../../../../images/fail.png'
      })
      return false
    }
  },

  /**
   * 发送验证码
   */
  bindSendCodeTap: function(e) {
    let _this = this;
    _this.setData({
      countdown: 60,
      disableBtn: true,
      showCountdown: true,
      countText: "重新发送",
    });
    let time = setInterval(() => {
      let countdown = _this.data.countdown;
      countdown--;
      console.info(countdown);
      _this.setData({
        countdown: countdown
      });
      if (countdown == 0) {
        clearInterval(time);
        _this.setData({
          countdown: "",
          countText: "重新发送",
          flag: true,
          disableBtn: false,
          showCountdown: false
        });
      }
    }, 1000)
  },

  bindRigester: function(e) {
    var that = this;
    var formData = e.detail.value;
    console.info(formData);
    // 模拟注册
    API.register("POST", formData, function(res) {
      console.log(res);
      // 注册成功返回登录
      wx.navigateTo({
        url: '../login/login',
      })
    });

  }
})