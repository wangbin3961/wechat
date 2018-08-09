const app = getApp();

Page({

  data: {

  },

  onLoad: function(options) {

  },

  onShow: function() {

  },

  bindPayTap: function(e) {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function(res) {
        console.info(res)
      },
      'fail': function(res) {
        console.info(res)
      }
    })
  },

  bindCanclePayTap: function() {
    wx.navigateBack({
      
    })
  }


})