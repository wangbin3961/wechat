let HOST = "http://localhost:8080/dispatch/";
var Mock = require('mock.js')

function register(method = "GET", params = {}, callback, debug = true) {
  console.info(params);
  if (debug) {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'id|+1': 1,
        'img': "@image('200x100', '#4A7BF7','#fff','pic')",
        'title': '@ctitle(3,8)',
        'city': "@county(true)",
        'stock_num': '@integer(0,100)', //库存数量  
        'marketing_start': '@datetime()',
        'marketing_stop': '@now()',
        'price': '@integer(100,2000)', //现价，单位：分  
        'original_price': '@integer(100,3000)'
      }]
    })
    // 输出结果
    callback(res);
  } else {
    wx.request({
      url: HOST + "register",
      data: params,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // 输出结果
        callback(res);
      }
    })
  }
}

function login(method = "GET", params = {}, callback, debug = false) {
  console.info(params);

  if(debug){
    var res = {
      data: {
        id: "1",
        loginName: "admin",
        openid: "oqW8r5IaazDBp569a7SoE_3hqIW0"
      }
    };
    callback(res);
  } else {
    wx.request({
      url: HOST + "app/userinfo/loginForWechat",
      data: params,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // 输出结果
        callback(res);
      }
    })
  }
  
}

function getParkByLocation(method = "GET", params = {}, callback, debug = true) {
  if (debug) {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'id|+1': 1,
        'name': '@ctitle(3,8)停车场',
        'city': "@county(true)",
        'emptyLot': '@integer(0,100)', //空闲车位
        "desc1": "现金支付 · 地上 · 免15分钟",
        "desc2": "车位充足",
        "desc3": "约@integer(5,20)元/小时",
        "latitude": 39.97933,
        "longitude": 116.31845
      }]
    })
    // 输出结果
    callback(res);
  }
}

module.exports = {
  register: register,
  login: login,
  getParkByLocation: getParkByLocation
}