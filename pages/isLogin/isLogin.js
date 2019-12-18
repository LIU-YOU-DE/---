// pages/isLogin/isLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isBool:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          isBool:options.bool
        })
  },
  bindGetUserInfo1(res) {
    console.log(44444422)
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
                console.log(res);
                var userinfo = {};
                userinfo['user_id'] = res.data.user_id;
                userinfo['nickName'] = info.detail.userInfo.nickName;
                userinfo['avatarUrl'] = info.detail.userInfo.avatarUrl;
                //用户添加成功，将其信息存入缓存
                wx.setStorageSync('userinfo', userinfo)
              var isBool = start.data.isBool;
                var userinfo = wx.getStorageSync('userinfo')
                if(userinfo['user_id']){
                  if (isBool == 1) {
                    //首页跳来的，去添加页面
                    wx.navigateTo({
                      url: '../addTake/addTake',
                    })
                  }
                }else{
                  console.log('获取失败')
                }
             
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