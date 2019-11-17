Page({
  data: {
    name: '开课吧小程序',
    showTitle: false,
    todos: [
      '吃饭',
      '睡觉',
      '学习'
    ],
    src: '',
    cameraDirection: 'front',
    badge: 1,
  },
  onLoad() {
    console.log('小程序加载了')
  },
  onShow() {
    console.log('切入当前页面')
  },
  toggleTitle(params) {
    console.log('切换', this.data)
    // this.showTitle = !this.showTitle
    this.setData({
      showTitle: !this.data.showTitle
    })
  },
  // js使用摄像头
  takePhoto() {
    let ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('res',res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  // 切换前后摄像头
  toggleDirection() {
    this.setData({
      cameraDirection: this.data.cameraDirection=== 'front' ? 'back': 'front'
    })
  },
  previewImage() {
    wx.previewImage({
      urls: [
        this.data.src,
        this.data.src
      ]
    })
  },
  // 保存图片
  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.src
    })
  },
  // 修改tabbar
  setTabBar() {
    this.setData({
      badge: this.data.badge+1
    })
    wx.setTabBarBadge({
      index: 0,
      text: this.data.badge+1 + ''
    })
  },
  
})