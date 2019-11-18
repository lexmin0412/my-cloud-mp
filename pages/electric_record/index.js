Page({
  data: {
    dataList: []
  },
  onLoad() {
    wx.cloud.init()
  },
  onShow() {
    let db = wx.cloud.database()
    db.collection('electric_charge').get({
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
      url: '/pages/electric_record/add'
    })
  },
  inputChange(e) {
    console.log('input change', e)
  }
})