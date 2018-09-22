const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 用户信息的模版
const userInfoTep = new Schema({
  account: String,
  password: String
})

userInfoTep.methods.findByAccount = function (cb) {
  return this.model('userInfo').find({'account': this.account}, cb)
}

export default userInfoTep
