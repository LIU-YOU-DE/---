Page({
  data: {
    "bannerUrl": [{
      "url": "../../images/prize/banner.png"
    }, {
      "url": "../../images/prize/banner.png"
    }, {
      "url": "../../images/prize/banner.png"
    }],
    indicator: '#DA8B81',
    indicatorActive: "#DD515A",
    showModalStatus: false,
    state:''
  },
  selectGift:function(e){
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  },
  // 礼物遮罩层
  giftopen: function () {
    this.showModal();
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showGiftModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showGiftModalStatus: false
      })
    }.bind(this), 200)
  },
  // 分享遮罩层
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200, 
      timingFunction: "linear", 
      delay: 0 
    });
    this.animation = animation;
    animation.translateY(240).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})