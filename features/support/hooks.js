var config = require('../../config')
var app = require('../../app')
var knex = require('../../db')
var knexConfig = {directory: './db/migrations'}

var server

module.exports = function () {

  this.registerHandler('BeforeFeatures', (features, callback) => {
    knex.migrate.latest()
    .then(function() {
      console.log('server starting....')
    server = app.listen(config.proxy.port, () => {
      callback()
    })
  })
})

  this.registerHandler('AfterFeatures', (features, callback) => {
    knex.migrate.rollback(knexConfig)
    .then(function () {
        console.log('server stopping....')
        server.close()
        callback()
  })
})

}
