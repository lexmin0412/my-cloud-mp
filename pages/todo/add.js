Page({
  data: {
    title: '' ,
    desc: '',
    is_finished: false,
    is_urgent: false
  },
  onLoad() {
    wx.cloud.init()
    wx.setNavigationBarTitle({
      title: '添加待办事项'
    })
  },
  bindKeyInput: function (e) {
    console.log(9999);
    
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 时间选择
  bindDateChange(e){
    console.log('e',e)
    this.setData({
      date: e.detail.value
    })
  },
  // 电表度数输入
  handleDegreeChange(e) {
    console.log('e',e)
    this.setData({
      degree: e.detail.value
    })
  },
  handleInput(sign) {
    console.log('sign',sign)
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
  // 提交按钮点击
  handleSubmit() {
    let db = wx.cloud.database()
    console.log('this.data', this.data, db, db.collection('electric_charge'))
    const { title, desc, is_finished, is_urgent } = this.data
    if ( !title || !desc ) {
      wx.showToast({
        title: '请先填入标题和描述',
        duration: 1200,
        mask: true,
        icon: 'none'
      })
      return
    }
    db.collection('todos').add({
      data: {
        title,
        desc,
        is_finished,
        is_urgent
      },
    }).then(res=>{
      console.log('res',res)
      wx.showToast({
        title: '添加成功',
        duration: 1200,
        mask: true
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1200);
    }).catch(err=>{
      console.log('err,',err)
    })
  },
  handleTextAreaInput(e) {
    console.log('textareachange')
    console.log('textareachange', e)
  },
  bindKeyInput(e){
    console.log(12212);
    
  }
})