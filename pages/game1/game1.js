// pages/game1/game1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[
      '孤舟蓑笠翁，独钓寒江雪',
      '千山鸟飞绝，万径人踪灭',
      '墙角数枝梅，凌寒独自开',
      '遥知不是雪，为有暗香来',
      '不知细叶谁裁出，二月春风似剪刀',
      '碧玉妆成一树高，万条垂下绿丝绦',
    ],
    computedList:[],
    num:0,
    tiStr:'',
    btnStr:'',
    resStr:'',
    success:false,
  },
  onReady: function () {
    this.setData({
      computedList: this.data.dataList.sort(function () {
        return .5 - Math.random();
      })
    })
    this.getStr()
  },
  getStr(){
    console.log(this.data.computedList)
    this.setData({
      resStr:'',
      tiStr: this.data.computedList[this.data.num].replace('，', '')
    })
    this.setData({
      btnStr: this.data.tiStr.split('').sort(function () {
        return .5 - Math.random();
      }).join('')
    })
  },
  push(event){
    this.setData({
      resStr: this.data.resStr + event.target.dataset.str
    })
    if (this.data.resStr === this.data.tiStr){
      console.log('对了')
      var that = this
      wx.showModal({
        title: '提示',
        content: '回答正确',
        confirmText:"下一题",
        success(res) {
          if (res.confirm) {
            if (that.data.num + 1 == that.data.dataList.length){
              that.setData({
                success: true
              })
              return
            }
            that.setData({
              num: that.data.num+1
            })
            that.getStr()
          } else if (res.cancel) {
          }
        }
      })
      return
    }
    if (this.data.resStr.length === this.data.tiStr.length) {
      console.log('错了')
      var that = this
      wx.showModal({
        title: '提示',
        content: '回答错误',
        confirmText: "重试",
        success(res) {
          that.clear()
        }
      })
      return
    }

  },
  clear(){
    this.setData({
      resStr: ''
    })
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  }
})