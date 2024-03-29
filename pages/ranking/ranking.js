// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_take_arr:[],
    take_arr:[],
    take_qian:[],
    user_take_id:'',
    onloginBool_wei: 'display: none;',
    onloginBool_dian: 'display: block;'
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
    //选手数据
    this.take_arr();
    //个人数据
    this.user_arr();
  },

  islogin: function () {
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo);
    if (!userinfo['user_id']) {  
      this.setData({
        onloginBool_wei: 'display: block;',
        onloginBool_dian: 'display: none;',
      })
    } else {
      this.user_arr();
      console.log('sdsadsalu')
      this.setData({
        onloginBool_wei: 'display: none;',
        onloginBool_dian: 'display: block;',
      })
    }
  },

  // //微信授权登陆
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
  /**
   * 选手的数据
   */
  take_arr:function(){
    var start = this;
   
    wx: wx.request({
      url: 'https://younan.younantech.cn/index.php/WingAip/RangKing/RangShow',
      data: {
  
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        start.setData({
          take_arr:res.data.take_arr
        })
      },
      fail: function (res) { },
      complete: function (res) { 
        wx.hideLoading()
      },
    })
  },
  /**
   * 个人数据
   */
  user_arr:function()
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
        console.log(res)
        start.setData({
          user_take_arr: res.data.user_take_arr,
        })             
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading()
       },
    })
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

  }
})