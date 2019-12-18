const app = getApp()
let col1H = 0;
let col2H = 0;
Page({
  data: {
    bool:0,
    new_style:'color:#dd515a',
    host_style:'color:#999999',
    action_images:[],
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    isSearch: true,
    searchVal: '',
    url:'https://younan.younantech.cn/index.php/WingAip/ActionAip/aipAction',
    competitorList: [{
      "number": "001",
      name: '就看大家了',
    }],
    slideData: [],
    competitorList: [{
      "number": "001",
      name: '就看大家了',
      ballot: 999,
      image: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
      isVote: false
    }, {
      "number": "001",
      name: 'changchang的昵称',
      ballot: 999,
      image: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
      isVote: false
    }, {
      "number": "001",
      name: 'changchang的昵称',
      ballot: 999,
      image: 'http://dev.guotu.zsylife.cn/minidata/index03.png',
      isVote: false
    }, {
      "number": "001",
      name: 'changchang的昵称',
      ballot: 999,
      image: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
      isVote: false
    },],
    countDown: {
      d: '6',
      h: "4",
      m: "4",
      s: "4",
    },
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,

  },
  onLoad() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://younan.younantech.cn/Public/WingHome/msyhbd.ttc")',
      success: console.log
    })
    wx.loadFontFace({
      family: 'Microsoft YaHei',
      source: 'url("https://younan.younantech.cn/Public/WingHome/msyh.ttc")',
      success: console.log
    })
    
  
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#757575',
    // });
    wx.showLoading({
      title: '加载中...',
    })
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
        //加载轮播图
        this.actonImages();
        //加载首组图片
        this.loadImages();
      }
    })
  },
  //活动图片加载
  actonImages:function()
  {
    
    var start = this;
      wx:wx.request({
        url: 'https://younan.younantech.cn/index.php/WingAip/ActionAip/actionImages',
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res)
          start.setData({
            action_images:res.data.action_images
          })
        },
        fail: function(res) {},
        complete: function(res) {
          wx.hideLoading()
        },
      })
  },

  onImageLoad: function (e) {
   
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度
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


    //判断当前图片添加到左列还是右列
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

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },
  loadImages: function () {
    var start = this;
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: start.data.url,
      data: {
        search_name: start.data.searchName
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        let images11 = [
          { pic: "../img/789.jpg", height: 122 },
          { pic: "../img/888.jpg", height: 32 },
          { pic: "../img/999.jpg", height: 220 },
          { pic: "../img/123321.jpg", height: 330 },
          { pic: "../img/5247.jpg", height: 220 },
          { pic: "../img/789.jpg", height: 550 },
          { pic: "../img/8520.jpg", height: 320 },
          { pic: "../img/963.jpg", height: 10 },
          { pic: "../img/999.jpg", height: 320 },
        ];
        let bool = start.data.bool;
        if (bool == '0') {
          let images = res.data.take_arr_moods
          console.log(images)
          let baseId = "img-" + (+new Date());
          for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
          }
          start.setData({
            loadingCount: images.length,
            images: images,
          });
        console.log(111)
        } else if (bool == 1) {
          console.log(22)
          let  images = res.data.take_host 
          console.log(images)      
          let baseId = "img-" + (+new Date());
          for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
          }
          start.setData({
            loadingCount: images.length,
            images: images,
          });
        }else{
          let images = res.data.arr
          if(images==0){
            wx.showToast({
              title: '没有该选手',
              icon: 'success',
              duration: 2000
            })
          }else{
            let baseId = "img-" + (+new Date());
            for (let i = 0; i < images.length; i++) {
              images[i].id = baseId + "-" + i;
            }
            start.setData({
              loadingCount: images.length,
              images: images,
            });
          }
          
        
        }
      
      },
      fail: function (res) { },
      complete: function (res) { 
        wx.hideLoading()
      },
    })


  },
  onReady() {

  }
  ,
  toggleSearch() {
    const that = this;
    this.setData({
      isSearch: !that.data.isSearch
    });
  },
  vote(e) {
    let dataset = e.currentTarget.dataset;
   
    if (dataset.isvote) {
      wx.showToast({
        title: '你已经为TA投过票了！',
        icon: 'none'
      })
      return
    }
    let list = this.data.competitorList;
    list[dataset.index].isVote = true;
    this.setData({
      competitorList: list
    }, function () {
      wx.showModal({
        title: '恭喜您',
        content: '给TA投票成功！',
        showCancel: false,
        confirmText: '好的'
      })
    });
  },
  toMain() {
    wx.navigateTo({
      url: '../main/main',
    })
  },
  activityIntr() {
    wx.showModal({
      title: '活动介绍',
      content: '本次投票是由.....对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）对于 POST 方法lication/ json 的数据，会对数据进行 JSON 序列化对于 POST 方法且 headon/ x - www - form - urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）',
      showCancel: false
    })
  },

  searchInput(e) {
    var start = this;
    start.setData({
      searchName:e.detail.value,
      url: "https://younan.younantech.cn/index.php/WingAip/ActionNum/search_action",
      col1: [],
      col2: [],
      images: [],
      bool: 3
    })
    this.loadImages();
    
  },
  take_action: function (e) {
   console.log(213333333)
    wx.reLaunch({
      url: '/pages/tadeils/tadeils?take_id=' + e.currentTarget.id
    })
  },
  new2: function (e)
  {
    console.log(213333333)
     this.setData({
       new_style:this.data.host_style,
       host_style:this.data.new_style,
       url:"https://younan.younantech.cn/index.php/WingAip/ActionAip/aipAction",
       col1: [],
       col2: [],
       images: [],
       bool:0
     })
    this.loadImages();
  },
  host2: function (e){
    console.log(213333333)
    this.setData({
      new_style: this.data.host_style,
      host_style: this.data.new_style,
      bool: 1,
      url: "https://younan.younantech.cn/index.php/WingAip/ActionAip/aipAction",
      col1: [],
      col2: [],
      images: [],
    })
    this.loadImages();
  },
  /**
   * 添加作品
   */
  add_take:function(){
    //先判断是否登陆
    var userinfo = wx.getStorageSync('userinfo')
    if(userinfo['user_id']){
        //已登录，跳到添加作品页面
      wx.navigateTo({
        url: '../addTake/addTake',
      })
    }else{
        //没有登陆跳到登陆页面
      wx.reLaunch({
        url: '../isLogin/isLogin?bool=1'
      })
    }
  },
  // 页面渲染完成后 调用
  onReady: function () {
    var totalSecond = 1580400000 - Date.parse(new Date()) / 1000;

    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  //cell事件处理函数
  bindCellViewTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../babyDetail/babyDetail?id=' + id
    });
  }

})
