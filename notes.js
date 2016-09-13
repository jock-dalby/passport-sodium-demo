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

app.get('/', intercept, function (req, res, next) {
  console.log('next in the chain', req.user)
  res.send('it works. Main route')
})

app.listen(3001, function () {
  console.log('listening')
})

//  1. FUNCTION GETTOKEN
//  if (token) {goToAuthentication} else {next()}

//  2. APP GET
//  app.get('/', getToken, function)
//  Upon landing on / page, sends user to getToken() function.
//  if (!token) {res.render 'login-register'}

//  3. APP POST
//    verify fields
//    if username exists:
//      hash password
//      authenticate
//      if hashed password same as in db:
//        login user
//        send token
//      else:
//        indicate error on page
//      end if
//    else:
//      hash password
//      send username and password to database
//      login user
//      send token
//    end if
