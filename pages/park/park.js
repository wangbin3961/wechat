//park.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    latitude: 40.002607,
    longitude: 116.487847,
    controls: [],
    circles: [],
    polyline: [],
    //标记点
    markers: [{
      iconPath: "img/park.png",
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
    parklist: [{
      "name":"测试停车场2"
    }, {
        "name": "测试停车场1"
      }],
    showItems: "flex"
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    console.log('click control.');
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
    console.info(e);
    wx.navigateTo({
      url: '../search/search',
    })
  },

  bindViewMoreTap: function(e) {
    this.setData({
      showItems: "flex"
    })
  },

  onLoad: function() {
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
  }
})