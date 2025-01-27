// pages/orderdetail/orderdetail.js\
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    totalprice: 0,
    address: {},
    order2:{}

  },
  confirm: function () {
    const that = this;
    var address_id = that.data.address.id
    var order2 = that.data.order2
    that.data.order.forEach((item) => {
      var seller_id
      var book_id
      var quantity
      seller_id = item.user.id
      book_id = item.book.id
      quantity = item.quantity
      console.log(item.id, typeof (item.id))
      wx.request({
        url: `http://127.0.0.1:8000/api/order/${order2.id}/`,
        method: 'PUT',
        data: {
          address_id: address_id,
          seller_id: seller_id,
          book_id: book_id,
          quantity: quantity,
          status: 1
        },
        header: {
          "token": wx.getStorageSync('token')
        },
        success: ((res) => {
          console.log(res.data.code, 445);
          // 加入订单成功
          if (res.data.code == 0) {
            Toast('付款成功！')
          }
        })
      })
      // wx.navigateBack('/pages/index/index')

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 999);
    this.setData({
      order: JSON.parse(options.carts),
      address: JSON.parse(options.address),
      order2:JSON.parse(options.order2),

    })
    var totalprice = 0
    this.data.order.forEach((item) => {
      totalprice = item.book.price * item.quantity + totalprice
    })
    this.setData({
      totalprice: totalprice
    })

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
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */




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

  }
})