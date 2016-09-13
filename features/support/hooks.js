require('babel-register')
var config = require('../../config')
var app = require('../../app')
var server

module.exports = function () {

  this.registerHandler('BeforeFeatures', (features, callback) => {
    console.log('server starting....')
    server = app.listen(config.proxy.port, () => {
      callback()
    })
  })

  this.registerHandler('AfterFeatures', (features, callback) => {
    console.log('server stopping....')
    server.close()
    callback()
  })
}
