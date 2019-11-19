/**
 * 设置微信头部公用方法
 */

export const setTitle = (title) => {
  wx.setNavigationBarTitle({
    title: title
  })
}