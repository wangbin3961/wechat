//park.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

let _parkList = [{
  "name": "测试停车场2",
  "id": "1",
  "desc1": "电子支付 · 地下 · 免15分钟",
  "desc2": "车位充足",
  "desc3": "约15.0元/小时",
  latitude: 39.97933,
  longitude: 116.31845
}, {
  "name": "测试停车场1",
  "id": "1",
  "desc1": "电子支付 · 地下 · 免15分钟",
  "desc2": "车位充足",
  "desc3": "约12.0元/小时",
  latitude: 39.97933,
  longitude: 116.31845
}, {
  "name": "大钟寺东路停车场",
  "id": "1",
  "desc1": "现金支付 · 地上 · 免15分钟",
  "desc2": "车位充足",
  "desc3": "约15.0元/小时",
  latitude: 39.97933,
  longitude: 116.31845
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
    }],
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

  //预约
  bindOrderTap: function(e) {
    wx.navigateTo({
      url: '../appointment/appointment'
    })
  },

  //取车缴费
  bindPayTap: function(e) {
    wx.navigateTo({
      url: '../pay/pay'
    })
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
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('park_map');

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