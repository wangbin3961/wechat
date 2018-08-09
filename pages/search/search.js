const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    history: [],
    hasHistory: false,
    parks: []
  },

  /**
   * 键盘输入事件
   */
  bindKeyInput: function(e) {
    console.info(e);
  },

  /**
   * 搜索按钮事件
   */
  bindConfirm: function(e) {
    console.info(e.detail.value);
    qqmapsdk.search({
      keyword: e.detail.value,
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    })
    //加入历史搜索记录
    var history = wx.getStorageSync('searchHistory') || [];
    history.unshift(e.detail.value);
    wx.setStorageSync('searchHistory', history);
    //跳转页面
    wx.switchTab({
      url: '../park/park',
    })
  },

  /**
   * 清空搜索记录
   */
  bindClearHistoryTap: function(e) {
    wx.removeStorageSync("searchHistory");
  },

  /**
   * 点击历史搜索 
   */
  bindHistorySearchTap: function(e) {
    var text = e.currentTarget.dataset.text;
    app.globalData.searchText = text;
    //跳转页面
    wx.switchTab({
      url: '../park/park',
    })
  },

  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'A7YBZ-JWPCX-L3E4V-7WVVY-H6QIV-LCFDK'
    });
    var _history = wx.getStorageSync('searchHistory');
    var _hasHistory = false;
    if (_history.length > 0) {
      _hasHistory = true;
    }
    this.setData({
      history: _history,
      hasHistory: _hasHistory
    });
  }
})