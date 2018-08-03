//park.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

let _parkList = [{
  "name": "测试停车场2",
  "id": "1"
}, {
  "name": "测试停车场1",
  "id": "1"
}];
let _searchplacehold = "请输入您的目的地";
let _searchmoreinfo = "点击查看更多停车场";
let _searchmoreinfo2 = "附近的停车场";

Page({
  data: {
    latitude: 40.002607,
    longitude: 116.487847,
    controls: [],
    circles: [],
    polyline: [],
    //标记点
    markers: [{
      iconPath: "../../images/park.png",
      id: 0,
      title: '11',
      latitude: 39.97933,
      longitude: 116.31845,
      width: 32,
      height: 32,
      callout: {
        content: '测试停车场',
        display: 'BYCLICK',
        color: '#345678',
        bgColor: '#ffffff',
        borderRadius: 3,
        padding: 5
      }
    }],
    rendered: false,
    parklist: _parkList,
    showItems: "none",
    searchplacehold: _searchplacehold,
    searchmoreinfo: _searchmoreinfo
  },

  //移动地图事件
  regionchange: function() {
    console.log('map region changed.');
  },

  //点击marker事件
  bindMarkerTap: function(e) {
    console.log(e);
  },

  bindCalloutTap: function(e) {
    console.info(e);
  },

  //定位到当前位置
  bindControlTap: function() {
    var _this = this;
    //获取当前位置
    wx.getLocation({
      type: 'wgs84', //返回GPS坐标
      success: function(res) {
        var _latitude = res.latitude
        var _longitude = res.longitude
        _this.setData({
          latitude: _latitude,
          longitude: _longitude
        });
      }
    })
  },

  //搜索目的地
  bindSearchTap: function(e) {
    app.globalData.searchText = "";
    wx.navigateTo({
      url: '../search/search',
    })
  },

  //查看更多
  bindViewMoreTap: function(e) {
    this.setData({
      showItems: "flex"
    })
  },

  //滚动到最上
  bindScrollToUpper: function(e) {
    this.setData({
      showItems: "none"
    })
  },

  //预约
  bindOrderTap: function(e) {
    wx.navigateTo({
      url: '../order/order'
    })
  },

  //取车缴费
  bindPayTap: function (e) {

  },

  onLoad: function(options) {
    var _this = this;
    //获取当前位置
    wx.getLocation({
      type: 'wgs84', //返回GPS坐标
      success: function(res) {
        var _latitude = res.latitude
        var _longitude = res.longitude
        _this.setData({
          latitude: _latitude,
          longitude: _longitude,
          rendered: true
        });
      }
    })
    // wx.request({
    //   url: 'http://localhost:7474',
    //   success: res => {
    //     console.info(res);
    //     this.setData({
    //       markers: res.data.parks
    //     })
    //   }
    // })
  },

  onShow: function() {
    // 生命周期函数--监听页面显示
    console.info(app.globalData);
    if (app.globalData.searchText) {
      // 搜索返回
      // TODO 地图重新定位
      // TODO 获取新位置停车场
      this.setData({
        parklist: [{
          "name": "测试停车场1",
          "id": "1"
        }],
        showItems: "flex",
        searchplacehold: app.globalData.searchText,
        searchmoreinfo: _searchmoreinfo2
      })
    } else {
      this.setData({
        parklist: _parkList,
        showItems: "none",
        searchplacehold: _searchplacehold,
        searchmoreinfo: _searchmoreinfo
      })
    }
  }
})