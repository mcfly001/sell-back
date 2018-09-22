const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品分类的模版
const categoryTep = new Schema({
  name: String,
  categoryId: String
})

categoryTep.methods.findByAccount = function (cb) {
  return this.model('userInfo').find({'account': this.account}, cb)
}

export default categoryTep
