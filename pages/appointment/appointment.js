const util = require('../../utils/util.js');
const currdate = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkdate: util.formatDate(currdate),
    parktime: util.formatTime(currdate),
    pickdate: util.formatDate(currdate),
    picktime: util.formatTime(currdate),
    wxsspicker1: "picker-default",
    wxsspicker2: "picker-default",
    wxsspicker3: "picker-default",
    wxsspicker4: "picker-default"
  },

  bindDateChange: function(e) {
    console.info(e);
    if (e.currentTarget.dataset.idx == "1") {
      this.setData({
        "parkdate": e.detail.value,
        "wxsspicker1": "picker"
      })
    } else if (e.currentTarget.dataset.idx == "2") {
      this.setData({
        "pickdate": e.detail.value,
        "wxsspicker3": "picker"
      })
    }

  },

  bindTimeChange: function(e) {
    if (e.currentTarget.dataset.idx == "1") {
      this.setData({
        "parktime": e.detail.value,
        "wxsspicker2": "picker"
      })
    } else if (e.currentTarget.dataset.idx == "2") {
      this.setData({
        "picktime": e.detail.value,
        "wxsspicker4": "picker"
      })
    }
  },

  bindCancelTap: function(e){
    wx.navigateBack({
      
    });
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

  }
})