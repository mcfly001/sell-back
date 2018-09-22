const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID
const mongourl = 'mongodb://47.98.169.84:3333'



const login = function (callback) {
  MongoClient.connect(mongourl, function (err, db) {
    if (err) throw err
    callback && callback(db)
  })
}

const insert = function (data, collectionName, fn) {
  login(function (db) {
    let sell = db.db('sell')
    sell.collection(collectionName).insert(data, function (err, result) {
      if (err) throw err
      fn(result)
      db.close()
    })
  })
}

const find = function (data, collectionName, fn) {
  if (collectionName === 'userInfo') {
    let {account, password} = data
    login(function (db) {
      let sell = db.db('sell')
      let filter = {account, password}
      sell.collection(collectionName).find(filter).count(function (err, result) {
        if (err) throw err
        fn(result)
        db.close()
      })
    })
  }
  else {
    let {pageSize, pageNum, searchText} = data
    let skipNum = Number(pageNum * (pageSize - 1))
    let limitNum = Number(pageNum)
    login(function (db) {
      let sell = db.db('sell')
      let filter = searchText ? {name: searchText} : {}
      let count = new Promise(function (resolve, reject) {
        sell.collection(collectionName).find(filter).count(function (err, result) {
          if (err) reject(err)
          resolve(result)
        })
      })
      let getArray = new Promise(function (resolve, reject) {
        sell.collection(collectionName)
          .find(filter)
          .sort({KEY: 1})
          .skip(skipNum)
          .limit(limitNum)
          .toArray(function (err, data) {
            if (err) reject(err)
            resolve(data)
          })
      })

      Promise.all([count, getArray]).then(function (values) {
        fn(values)
        db.close()
      })
    })
  }
}

const remove = function (data, collectionName, fn) {
  login(function (db) {
    let sell = db.db('sell')
    let _id = ObjectID(data)
    sell.collection(collectionName).remove({_id}, function (err, result) {
      if (err) throw err
      fn(result)
      db.close()
    })
  })
}

const update = function (olddata, newdate, collectionName, fn) {
  login(function (db) {
    let sell = db.db('sell')
    sell.collection(collectionName).update(olddata, newdate, function (err, result) {
      if (err) throw err
      fn(result)
      db.close()
    })
  })
}

module.exports = {
  insert,
  find,
  remove,
  update
}
