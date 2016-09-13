var express = require('express')


var app = express()

app.use(function (req, res, next) {
  console.log('my middleware', req.url)
  if (req.url === '/cats') {
    res.send('you got cats')
  } else {
    next()
  }
})

function intercept (req, res, next) {
  console.log('my intercept')
  req.user = 'Simon' 
  next()

}
// serialise
// deserialise


app.get('/', intercept, function (req, res, next) {

  console.log('next in the chain', req.user)
  res.send('it works. Main route')

})

app.listen(3001, function () {
  console.log('listening')
})


// 

// 1. middleware
// 2. token ticket
// 3. cryptographic hashing [x]

// Hashing one way conversion string -> hash




