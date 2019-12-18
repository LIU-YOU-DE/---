// pages/production/production.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_images:[],
    user_take_arr:[],
    action_images:[],
    "bannerUrl": [{
      "url": "../../images/prize/banner.png"
    }, {
        "url": "../../images/prize/banner.png"
    }, {
        "url": "../../images/prize/banner.png"
    }],
    "bnrUrl": [{
      "url": "../img/789.jpg"
    }, {
      "url": "../img/888.jpg"
    }, {
      "url": "../img/963.jpg"
    }, {
      "url": "../img/999.jpg"
    }],
    login_bool:'display: none;',
    mse:'',
    onloginBool_wei: 'display: none;',
    onloginBool_dian: 'display: block;',
    shenghe_bool:'display: none;',
    indicator:'#DA8B81',
    indicatorActive:"#DD515A"
  },
  //活动图片加载
  actonImages: function () {
    var start = this;
    wx: wx.request({
      url: 'https://younan.younantech.cn/index.php/WingAip/ActionAip/actionImages',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        start.setData({
          action_images: res.data.action_images
        })
      },
      fail: function (res) { },
      complete: function (res) { 
        wx.hideLoading()
      },
    })
  },

  goEdit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },

  //微信授权登陆
  bindGetUserInfo1(res) {

    let info = res;
    var start = this;
    console.log(info);
    if (info.detail.userInfo) {
      console.log("点击了同意授权");
      wx.login({
        success: function (res) {
          console.log(res.code);
          if (res.code) {
            start.setData({
              userInfo: info.detail.userInfo,
            })
            wx.request({
              url: "https://younan.younantech.cn/index.php/WingAip/UserAip/login",
              data: {
                code: res.code,
                nickName: info.detail.userInfo.nickName,
                city: info.detail.userInfo.city,
                province: info.detail.userInfo.province,
                avatarUrl: info.detail.userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                var userinfo = {};
                userinfo['user_id'] = res.data.user_id;
                userinfo['nickName'] = info.detail.userInfo.nickName;
                userinfo['avatarUrl'] = info.detail.userInfo.avatarUrl;
                //用户添加成功，将其信息存入缓存
                wx.setStorageSync('userinfo', userinfo)
                start.islogin();
              }
            })

          } else {
            console.log("授权失败");
          }
        },
      })

    } else {
      console.log("点击了拒绝授权");
    }
  }, 
  islogin: function () {
    var userinfo = wx.getStorageSync('userinfo')
    if (!userinfo['user_id']) {
      this.setData({
        onloginBool_wei: 'display: block;',
        onloginBool_dian: 'display: none;',
      })
    } else {  
      this.user_take();
      this.setData({
        onloginBool_wei: 'display: none;',
        onloginBool_dian: 'display: block;',
      })
    }
  },
  user_take:function()
  {
    var userinfo = wx.getStorageSync('userinfo')
    var start = this;
    wx: wx.request({
      url: 'https://younan.younantech.cn/index.php/WingAip/RangKing/user_arr',
      data: {
        user_id: userinfo['user_id']
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.bool_ses==1){
          //没有您的作品
          start.setData({
            login_bool:'display: block;',
            onloginBool_dian:'display: none;',
            mse: res.data.mse
          })
        } else if (res.data.bool_ses==2){
          //作评没有审核完成
          start.setData({
            shenghe_bool: 'display: block;',
            mse:res.data.mse
          })
        }
        console.log(res)
        start.setData({
          user_take_arr: res.data.user_take_arr,
          user_images: res.data.user_images
        })
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading()
       },
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中...',
    })
    //判断是否登陆
    this.islogin();
    this.actonImages();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login:function(){
    wx.navigateTo({
      url: '../addTake/addTake',
    })
  }
})