import { setTitle } from './../../utils/setting'

Page({
  data: {
    dataList: []
  },
  onLoad() {
    setTitle('待办事项')
    wx.cloud.init()
  },
  onShow() {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    let db = wx.cloud.database()
    db.collection('todos').get({
      success: res=>{
        console.log('res',res)
        wx.hideLoading()
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
  },
  // 跳转详情
  jumpToDetail(e) {
    console.log('er',e)
    const {
      _id,
      title, 
      desc,
      is_finished,
      is_urgent,
      date
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/todo/detail?id=${_id}&title=${title}&desc=${desc}&is_finished=${is_finished}&is_urgent=${is_urgent}&date=${date}`
    })
  },
  itemCheck(e) {
    const item = e.currentTarget.dataset.item
    const {
      _id,
      title, 
      desc,
      date,
      is_finished,
      is_urgent,
    } = item
    const db = wx.cloud.database()
    if ( !item.is_finished ) {
      let _this = this
      wx.showModal({
        title: '确认此事项已完成？',
        duration: 1200,
        mask: true,
        icon: 'none',
        success(res) {
          if ( res.confirm ) {
            db.collection('todos').doc(item._id).update({
              data: {
                is_finished: true ,
              }
            }).then((res=>{
              db.collection('todos').get({
                success: res=>{
                  console.log('res',res)
                  _this.setData({
                    dataList: res.data
                  })
                }
              })
            }))
          }
        }
      })
    }
  }
})