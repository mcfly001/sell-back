const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品的模版
const goodsTep = new Schema({
  goodsId: String,
  name: String,
  price: String,
  belogCategoryId: String,
  breif: String
})

goodsTep.methods.findByAccount = function (cb) {
  return this.model('userInfo').find({'account': this.account}, cb)
}

export default goodsTep
