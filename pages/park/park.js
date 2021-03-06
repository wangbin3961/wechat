//park.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const API = require('../../utils/api.js');

let _parkList = [];
let _markers = [{
  iconPath: "../../images/park-m.png",
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
    markers: _markers,
    rendered: false,
    parklist: _parkList,
    showItems: "none",
    searchplacehold: _searchplacehold,
    searchmoreinfo: _searchmoreinfo,
    height: "100px"
  },

  //移动地图事件
  regionchange: function(e) {
    if (e.type == "end") {
      this.mapCtx.getCenterLocation({
        success: function(res) {
          console.log(res.longitude)
          console.log(res.latitude)
        }
      })
      this.mapCtx.getRegion({
        success: function(res) {
          console.log(res)
        }
      })
    }

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
    this.mapCtx.moveToLocation();
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
    if (this.data.showItems == "flex") {
      this.setData({
        showItems: "none"
      })
    } else {
      this.setData({
        showItems: "flex"
      })
    }
    console.info(this.data.parklist.length);
    console.info(app.globalData.windowHeight);

    if (this.data.parklist.length < 3) {
      this.setData({
        height: "auto"
      })
    } else {
      this.setData({
        height: app.globalData.windowHeight / 2 + "px"
      })
    }
  },

  //滚动到最上
  bindScrollToUpper: function(e) {
    // this.setData({
    //   showItems: "none"
    // })
  },

  bindScrollToLower: function(e) {

  },

  bindScroll: function(e) {

  },

  //预约
  bindOrderTap: function(e) {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../appointment/appointment'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }

  },

  //取车缴费
  bindPayTap: function(e) {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../pay/pay'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },

  onLoad: function(options) {
    var _this = this;
    // 获取当前位置
    wx.getLocation({
      type: 'wgs84', // 返回GPS坐标
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
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('park_map');

    // 查询停车场
    API.getParkByLocation("GET", {}, function(res) {
      _parkList = res.data;
    }, true);
  },

  onShow: function() {
    // 生命周期函数--监听页面显示
    console.info(app.globalData);
    if (app.globalData.searchText) {
      // 搜索返回
      let _result = [{
        "name": "测试停车场1",
        "id": "1",
        "desc1": "电子支付 · 地下 · 免15分钟",
        "desc2": "车位充足",
        "desc3": "约12.0元/小时",
        latitude: 39.97933,
        longitude: 116.31845
      }];
      // TODO 地图重新定位
      const location = app.globalData.searchLocation;
      if (location.lat && location.lng){       
        _markers = [{
          iconPath: "../../images/marker1.png",
          id: 0,
          title: '11',
          latitude: location.lat,
          longitude: location.lng,
          width: 32,
          height: 32,
          callout: {
            content: app.globalData.searchText,
            display: 'BYCLICK',
            color: '#345678',
            bgColor: '#ffffff',
            borderRadius: 3,
            padding: 5
          }
        }];
        _markers.push({
          iconPath: "../../images/park-m.png",
          id: 1,
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
        })
        this.setData({
          latitude: location.lat,
          longitude: location.lng,
          markers: _markers
        })
      }
      console.info(location);

      // TODO 获取新位置停车场
      let _height = "auto";
      if (_result.length > 2) {
        _height = app.globalData.windowHeight / 2 + "px";
      }
      this.setData({
        parklist: _result,
        showItems: "flex",
        searchplacehold: app.globalData.searchText,
        searchmoreinfo: _searchmoreinfo2,
        height: _height
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