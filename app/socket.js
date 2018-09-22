var ws = require('nodejs-websocket')
console.log('?~@?~K建?~K?~^?~N?...')

var game1 = null, game2 = null, game1Ready = false, game2Ready = false
var server = ws.createServer(function (conn) {
  conn.on('text', function (str) {
    console.log('?~T??~H??~Z~D信?~A?为:' + str)
    if (str === 'game1') {
      game1 = conn
      game1Ready = true
      conn.sendText('success')
    }
    if (str === 'game2') {
      game2 = conn
      game2Ready = true
    }

    if (game1Ready && game2Ready) {
      game2.sendText(str)
    }

    conn.sendText(str)
  })

  conn.on('close', function (code, reason) {
    console.log('close close')
  })

  conn.on('error', function (code, reason) {
    console.log('error error')
  })

}).listen(8001)
console.log('WebSocket create over')
