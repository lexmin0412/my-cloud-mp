// 初始化
wx.cloud.init()
const db = wx.cloud.database()  

Page({
  data: {
    books: []
  },
  queryCloudData() {
    // 小程序端直接读取数据库
    db.collection('books').get({
      success: res=>{
        console.log('res',res)
        if ( res ) {
          wx.showToast({
            title: '获取数据成功',
            mask: true,
            duration: 1200
          })
          this.setData({
            books: res.data
          })
        }
      }
    })
  },
  addItem() {
    // 添加记录
    db.collection('books').add({
      data: {
        id: 2,
        name: 'javascript高级程序设计',
        englishName: 'javascript hyper program design'
      }
    })
  }
})