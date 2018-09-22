const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const app = express()
const { insert, find, remove } = require('./mongo')

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

// 登陆
app.get('/api-douchi/login', function (req, res) {
  let { account, password } = url.parse(req.url, true).query
  find({ account, password }, 'userInfo', function (result) {
    let arr = Object.keys(result)
    if (arr.length) {
      res.send(JSON.stringify({
        data: true,
        success: true
      }))
    }
    else {
      res.send(JSON.stringify({
        data: false,
        success: true
      }))
    }
  })
})

// 获取商品列表
app.get('/api-douchi/get.goods.list', function(req, res){
  let { pageSize, pageNum, searchText } = url.parse(req.url, true).query
  find({pageSize, pageNum, searchText}, 'goods', function(result){
    let data = result[1].length ? result[1] : []
    res.send(JSON.stringify({
      data: data,
      total: result[0],
      success: true
    }))
  })
})

// 添加商品
app.post('/api-douchi/add.goods', function(req, res){
  let { name, price, category, breif } = req.body
  insert({name, price, category, breif}, 'goods', function(result){
    if(Number(result.result.ok) === 1){
      res.send(JSON.stringify({
        data: 1,
        success: true
      }))
    }
    else{
      res.send(JSON.stringify({
        data: 0
      }))
    }
  })
})

// 删除商品
app.post('/api-douchi/delete.goods', function(req, res){
  let { _id } = req.body
  remove(_id, 'goods', function(result){
    if(Number(result.result.ok) === 1){
      res.send(JSON.stringify({
        data: 1,
        success: true
      }))
    }
    else{
      res.send(JSON.stringify({
        data: 0
      }))
    }
  })
})

// 获取分类列表
app.get('/api-douchi/get.category.list', function(req, res){
  let { pageSize, pageNum, searchText } = url.parse(req.url, true).query
  find({pageSize, pageNum, searchText}, 'category', function(result){
    let data = result[1].length ? result[1] : []
    res.send(JSON.stringify({
      data: data,
      total: result[0],
      success: true
    }))
  })
})

// 添加分类
app.post('/api-douchi/add.category', function(req, res){
  let { name } = req.body
  insert({name}, 'category', function(result){
    if(Number(result.result.ok) === 1){
      res.send(JSON.stringify({
        data: 1,
        success: true
      }))
    }
    else{
      res.send(JSON.stringify({
        data: 0
      }))
    }
  })
})

// 删除分类
app.post('/api-douchi/delete.category', function(req, res){
  let { _id } = req.body
  remove(_id, 'category', function(result){
    if(Number(result.result.ok) === 1){
      res.send(JSON.stringify({
        data: 1,
        success: true
      }))
    }
    else{
      res.send(JSON.stringify({
        data: 0
      }))
    }
  })
})

app.listen(8700, "127.0.0.1")
