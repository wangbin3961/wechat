// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    isPassword: true
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

  bindRigester: function(e) {
    var that = this;
    var formData = e.detail.value;
    console.info(formData);
    // wx.request({
    //   url: 'http://test.com:8080/test/socket.php?msg=2',
    //   data: formData,
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //     that.modalTap();
    //   }
    // })

  }
})