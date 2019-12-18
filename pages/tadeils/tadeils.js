// pages/tadeils/tadeils.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onloginBool_wei:'display: none;',
    onloginBool_dian:'display: block;',
    take_id:'',
    take_num:'',
    rank:'',
    take_detail_arr:[],
    user_images:[],
    action_images: [],
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
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载活动
    this.actonImages();
    //判断用户是否登陆
    this.islogin();
    //选手id
    this.setData({
      take_id:options.take_id
    })
    //加载选手数据
    this.user_take()
  },

  /**
   * 加载选手
   */
  user_take: function () {
    //拿到选手id请求数据库
    var start = this;
    wx: wx.request({
      url: 'https://younan.younantech.cn/index.php/WingAip/RangKing/take_detail',
      data: {
        take_id: start.data.take_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        start.setData({
          take_num: res.data.take_detail_arr['take_num'],
          rank: res.data.take_detail_arr['rank'],
          user_take_arr: res.data.take_detail_arr,
          user_images: res.data.user_images,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  islogin:function()
  {
    console.log('sdsadsalu23213')
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo);
    if (!userinfo['user_id']) {
      console.log('sdsadsalu')
      this.setData({
        onloginBool_wei: 'display: block;',
        onloginBool_dian: 'display: none;',
      })
    }else{
      console.log('sdsadsalu')
      this.setData({
        onloginBool_wei: 'display: none;',
        onloginBool_dian: 'display: block;',
      })
    }
  },

  // //微信授权登陆
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
     * 点击投票处理
     */
  touAction:function() {
    var start = this;
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
   
      wx:wx.request({
        url: 'https://younan.younantech.cn/index.php/WingAip/ActionNum/action_dian',
        data: {
          user_id: userinfo['user_id'],
          take_id :start.data.take_id
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          start.setData({
            take_num: res.data.take_num,
            rank: res.data.rank_num
          })
          wx.showToast({
            title: '投票成功,剩余次数' + res.data.user_vote_num,
            icon: 'none',
            duration: 2000
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
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