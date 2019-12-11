// miniprogram/pages/index/index.js
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      indicatorDots: true,
      autoplay: true,
      indicatorColor: "EC977F",
      indicatorActivecolor:'#DD515A',
      interval: 3000,
      duration: 1000,
      imageList: [
        { "url": "../../images/banner/banner1.jpg" },
        { "url": "../../images/banner/banner2.jpg" },
        { "url": "../../images/banner/banner3.jpg" }
      ],
      scrollH: 0,
      imgWidth: 0,//图片宽度
      loadingCount: 0,//图片总数
      images: [],//存放图片数据
      col1: [],//左
      col2: [],//右
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        this.loadImages();
      }
    })
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW //比例计算
    let imgHeight = oImgH * scale; //自适应高度
    let images = this.data.images;
    let imageObj = null;
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }
    this.setData(data);
  },
  loadImages: function () {
    let images = [
      { img: '../../images/conter/c1.jpg', height: 0 },
      { img: '../../images/conter/c2.jpg', height: 0 },
      { img: '../../images/conter/c3.jpg', height: 0 },
      { img: '../../images/conter/c4.jpg', height: 0 },
      { img: '../../images/conter/c5.jpg', height: 0 },
      { img: '../../images/conter/c6.jpg', height: 0 },
      { img: '../../images/conter/c7.jpg', height: 0 },
      { img: '../../images/conter/c8.jpg', height: 0 },
      { img: '../../images/conter/c9.jpg', height: 0 },
      { img: '../../images/conter/c10.jpg', height: 0 },
      { img: '../../images/conter/c11.jpg', height: 0 },
      { img: '../../images/conter/c12.jpg', height: 0 },
      { img: '../../images/conter/c13.jpg', height: 0 },
      { img: '../../images/conter/c14.jpg', height: 0 },
      { img: '../../images/conter/c15.jpg', height: 0 },
      { img: '../../images/conter/c16.jpg', height: 0 },
      { img: '../../images/conter/c17.jpg', height: 0 },
    ]
    let baseId = "img-" + (+new Date());
    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }
    this.setData({
      loadingCount: images.length,
      images: images,
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