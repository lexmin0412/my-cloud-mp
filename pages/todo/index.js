Page({
  data: {
    dataList: []
  },
  onLoad() {
    wx.cloud.init()
  },
  onShow() {
    let db = wx.cloud.database()
    db.collection('todos').get({
      success: res=>{
        console.log('res',res)
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  handleAdd() {
    wx.navigateTo({
      url: '/pages/todo/add'
    })
  },
  inputChange(e) {
    console.log('input change', e)
  }
})