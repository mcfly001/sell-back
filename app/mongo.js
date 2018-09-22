const userInfoTep = require('./userInfo')
const goodsTep = require('./goods')
const categoryTep = require('./category')

// 设置模版
const UserInfo = mongoose.model('UserInfo', userInfoTep)
const GoodsInfo = mongoose.model('GoodsInfo', goodsTep)
const categoryInfo = mongoose.model('categoryInfo', categoryTep)
// 连接数据库
mongoose.connect('mongodb://47.98.169.84:3333/sell')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', function () {
  console.log('open')
})

let userInfo = new UserInfo({
  account: '15869027281',
  password: '12312333'
})

userInfo.save(function (err, info) {
  if(err){
    return console.error(err)
  }
  console.log(info)
})

