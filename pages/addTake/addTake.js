// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    img_arr:[],
    take_name:'',
    take_content:'',
    user_phone:''
  },
  chooseImage(e) {
    var  that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下6张照片
        const images1 = images.length <= 6 ? images : images.slice(0, 6);
        let  img_arr = that.data.img_arr;
        this.setData({
          images: images1,
        })
        console.log(images)
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx, 1)
    

    this.setData({
      images: images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  puloadFile:function(){
   
      var that = this;
    var userinfo = wx.getStorageSync('userinfo')
      var images = that.data.images;
    var user_id = userinfo['user_id']
      //先发送表单信息进行添加
      wx.request({
        url: 'https://younan.younantech.cn/index.php/WingAip/UpdataFile/add_user_ms',
        data: {
          user_id:user_id,//用户id
          take_name:that.data.take_name,//作品名称
          take_content:that.data.take_content,//作品描述
          user_phone:that.data.user_phone//用户手机号
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          var take_id = res.data.add_take_bool;
          console.log(res)
          if (res.data.code==0){
            console.log('改用户已有作品')
            console.log(res)
            return false;
          }
        
          //当添加信息成功之后，开始添加图片
          for (var i = 0; i < images.length; i++) {
            wx.showLoading({
              title: '上传中。。',
            })
            //上传图片
            wx.uploadFile({
              url: 'https://younan.younantech.cn/index.php/WingAip/UpdataFile/add_take_file', //仅为示例，非真实的接口地址
              filePath: images[i],
              name: 'file',
              header: {
                "content-type": "multipart/form-data",
                'content-type': 'application/x-www-form-urlencoded' //表单提交
              },
              formData: {
                'take_id': take_id
              },
              success(res) {
                const data = res.data
                console.log(res);
                wx.navigateTo({
                  url: '../production/production',
                })
                //do something
              },
              complete: function (res) { 
                wx.hideLoading()
              },
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
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

  },
  /**
   * 表单信息函数
   */
  take_name: function (e){
    this.setData({
      'take_name': e.detail.value,
    })
  },
  take_content: function (e){
    this.setData({
      'take_content': e.detail.value,
    })
    
  },
  user_phone: function (e){
    this.setData({
      'user_phone': e.detail.value,
    })

  }




})