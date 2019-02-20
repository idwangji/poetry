// pages/game2/game2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    num: 0,
    dataList:[
      '醉卧古藤阴下，了不知南北',
      '孤舟蓑笠翁，独钓寒江雪',
      '但使主人能醉客，不知何处是他乡',
      '墙角数枝梅，凌寒独自开',
      '碧玉妆成一树高，万条垂下绿丝绦',
      '营州少年厌原野，狐裘蒙茸猎城下',
      '百亩庭中半是苔，桃花净尽菜花开',
    ],
    list:['A','B','C','D'],
    btnArr:[]
  },

  
  onReady: function () {
    this.getData()
  },

  getData(){
    let arr=[];
    let filterArr = JSON.parse(JSON.stringify(this.data.dataList));
    arr.push(this.data.dataList[this.data.num])
    filterArr.splice(this.data.num, 1)
    filterArr.sort(function () {
      return .5 - Math.random();
    }).sort(function () {
      return .5 - Math.random();
      })
    arr = [...arr, ...filterArr.splice(0, 3)].sort(function () {
      return .5 - Math.random();
    })
    this.setData({
      btnArr:arr
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  push(event){
    console.log(event.target.dataset.str)
    console.log(this.data.dataList[this.data.num])
    console.log(this.data.num)
    if (event.target.dataset.str == this.data.dataList[this.data.num]){
      console.log('对了')
      var that = this
      wx.showModal({
        title: '提示',
        content: '回答正确',
        confirmText: "下一题",
        success(res) {
          if (res.confirm) {
            if (that.data.num + 1 == that.data.dataList.length) {
              that.setData({
                success: true
              })
              return
            }
            that.setData({
              num: that.data.num + 1
            })
            that.getData()
          } else if (res.cancel) {
          }
        }
      })
    }else{
      var that = this
      wx.showModal({
        title: '提示',
        content: '回答错误',
        confirmText: "重试",
        success(res) {
          
        }
      })
    }
  }
})