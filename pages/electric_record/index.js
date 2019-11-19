import { setTitle } from './../../utils/setting'

Page({
  data: {
    dataList: []
  },
  onLoad() {
    wx.cloud.init()
    wx.setNavigationBarTitle({
      title: 'Electric Degree Record'
    })
  },
  onShow() {
    setTitle('电费记录')
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
  },
  // 删除按钮点击
  handleDelete(e) {
    const db = wx.cloud.database()
    const data = e.currentTarget.dataset.item
    console.log('[handledelete', data)
    db.collection('electric_charge').doc(data._id).remove().then(res=>{
      console.log('res',res)
      wx.showToast({
        title: '删除成功',
        mask: true,
        duration: 1200
      })
      setTimeout(() => {
        db.collection('electric_charge').get({
          success: res=>{
            console.log('res',res)
            this.setData({
              dataList: res.data
            })
          }
        })
      }, 1200);
    })
  }
})