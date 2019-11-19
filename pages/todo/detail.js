import { setTitle } from './../../utils/setting'

Page({
  data: {
    detail: {
      title: '',
      desc: '',
    }
  },
  onLoad() {
    wx.cloud.init()
    setTitle('待办事项 - 详情')
    console.log('this', this)
    this.setData({
      ...this.options
    })
  },
  onShow() {

  },
  titleInput(e) {
    console.log('title input', e.detail)
    this.setData({
      title: e.detail.value
    })
  },
  descInput(e) {
    console.log('desc input', e.detail)
    this.setData({
      desc: e.detail.value
    })
  },
  handleDelete() {
    wx.showLoading({
      title: '正在删除...',
      mask: true,
    })
    console.log('handledelete',this.options.id)
    // 初始化数据库
    let db = wx.cloud.database()
    console.log('db',db.collection('todos'), db, db.collection('todos').doc(this.options.id))
    db.collection('todos').doc(this.options.id).remove().then(res=>{
      console.log('res',res)
      wx.hideLoading()
      wx.showToast({
        title: '删除成功',
        mask: true,
        duration: 1200
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1200);
    }).catch(err=>{
      console.error('error',err)
    })
  },
  handleSave() {
    console.log('handleSave', this.data)
    const { title, desc, is_finished, is_urgent, date } = this.data
    let db = wx.cloud.database()
    console.log('db',db.collection('todos'), db, db.collection('todos').doc(this.options.id))
    db.collection('todos').doc(this.options.id).update({
      data: {
        title,
        desc, 
        is_finished: [true, 'true'].includes(is_finished) ? true : false ,
        is_urgent: [true, 'true'].includes(is_urgent) ? true : false ,
        date
      }
    }).then(res=>{
      console.log('res',res)
      wx.showToast({
        title: '保存成功',
        mask: true,
        duration: 1200
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1200);
    })
  }
})