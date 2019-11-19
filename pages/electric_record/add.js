// pages/electric_record/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    degree: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindDateChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

  degreeChange(e) {
    this.setData({
      degree: e.detail.value
    })
  },

  handleSubmit() {
    const { degree, time } = this.data
    console.log('degree, time', degree, time)
    let db = wx.cloud.database()
    db.collection('electric_charge').add({
      data: {
        degree,
        time
      }
    }).then(res=>{
      console.log('res',res)
      wx.showToast({
        title: '添加成功',
        duration: 1200,
        mask: true,
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1200);
    }).catch(err=>{
      console.log('err',err)
    })
  }
})