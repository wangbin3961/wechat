const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    history: [],
    showHistory: false,
    result: [],
    showResult: false,
    noresult: true
  },

  /**
   * 键盘输入事件
   */
  bindKeyInput: function(e) {
    console.info(e.detail);
    // 切换搜索历史和搜索结果面板的显示
    if (e.detail.cursor > 0) {
      this.setData({
        showResult: true,
        showHistory: false
      })
    } else {
      this.setData({
        showResult: false,
        showHistory: true
      })
    }

    qqmapsdk.search({
      keyword: e.detail.value,
      success: res => {
        console.log(res);
        if (res.data.length > 0) {
          this.setData({
            noresult: false,
            result: res.data
          })
        } else {
          this.setData({
            noresult: true,
            result: []
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    })
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
        this.setData({
          result: res.data
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {}
    })
    // 加入历史搜索记录
    let history = wx.getStorageSync('searchHistory') || [];
    history.unshift(e.detail.value);
    wx.setStorageSync('searchHistory', history);
    // 跳转页面
    wx.switchTab({
      url: '../park/park',
    })
  },

  /**
   * 清空搜索记录
   */
  bindClearHistoryTap: function(e) {
    wx.removeStorageSync("searchHistory");
    this.setData({
      history: []
    })
  },

  /**
   * 点击历史搜索 
   */
  bindHistorySearchTap: function(e) {
    var text = e.currentTarget.dataset.text;
    app.globalData.searchText = text;
    // 跳转页面
    wx.switchTab({
      url: '../park/park',
    })
  },

  bindViewResultTap: function(e) {
    let text = e.currentTarget.dataset.title;
    // 存储为历史检索记录
    let history = wx.getStorageSync('searchHistory') || [];
    history.unshift(text);
    wx.setStorageSync('searchHistory', history);

    app.globalData.searchText = text;
    // 跳转地图页面
    wx.switchTab({
      url: '../park/park',
    })
  },

  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'A7YBZ-JWPCX-L3E4V-7WVVY-H6QIV-LCFDK'
    });
    var _history = wx.getStorageSync('searchHistory');
    var _showHistory = false;
    if (_history.length > 0) {
      _showHistory = true;
    }
    this.setData({
      history: _history,
      showHistory: _showHistory
    });
  }
})