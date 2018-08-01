const app = getApp();
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
    var history = wx.getStorageSync('searchHistory') || []
    history.unshift(e.detail.value)
    wx.setStorageSync('searchHistory', history)
  },

  /**
   * 清空搜索记录
   */
  bindClearHistoryTap: function(e) {
    wx.removeStorageSync("searchHistory");
  },

  onLoad: function() {
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