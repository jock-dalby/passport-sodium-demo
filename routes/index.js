const bodyParser = require('body-parser')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const express = require('express')
const passport = require('passport')
const users = require('../lib/users')

const router = express.Router()
module.exports = router
router.use(bodyParser.urlencoded({ extended: false }))

// GET request login
  // render login.hbs
router.get('/login', function (req, res) {
  res.render('login', { flash: req.flash('error') })
})

// POST request - handles POST query at '/login'
  // use passport module to authenticate POSTed credentials
    // if credentials work (success) then Redirect to '/' - the index page
    // if credentials don't work, then Redirect to '/login'
    // flash the error message to user on the '/login' page
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

// GET request from clicking logout at '/' (when logged in)
  // perform the .logout() function
  // redirect the user to the login page
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

// GET request at root '/'
  // make sure the user is logged in (using the ensureLoggedIn function from the connect-ensure-login package)
  // show the wombat (the index page)

/*  If the user is not logged in, the sequence of requests and responses that take place during this process can be confusing. Here is a step-by-step overview of what happens:

User navigates to GET /settings
Middleware sets session.returnTo to /settings
Middleware redirects to /login
User's browser follows redirect to GET /login
Application renders a login form (or, alternatively, offers SSO)
User submits credentials to POST /login
Application verifies credentials
Passport reads session.returnTo and redirects to /settings
User's browser follows redirect to GET /settings
Now authenticated, application renders settings page
*/

router.get('/',
  ensureLoggedIn(),

  // // or can could be done without ensureLoggedIn as below if you wanted to configure differently
  // passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // }),

  function (req, res) {
    res.render('index')
  }
)

router.get('/register', function (req, res) {
  res.render('register', { flash: req.flash('error') })
})

router.post('/register', function (req, res, next) {
    users.exists(req.body.username)
      .then(function (exists) {
        if (exists) {
          req.flash('error', 'User already exists, sorry.')
          return res.redirect('/register')
        }

        // req.login() can be used to automatically log the user in after registering
        users.create(req.body.username, req.body.password)
          .then(function () { return res.redirect('/login')} ) // this directs the registered user to login - we want to streamline this
          .catch(function (err) {
            console.error(err)
            next()
          })
      })
      .catch(function (err) {
        console.error(err)
        next()
      })
  },
  function (req, res) {
    req.flash('error', "Couldn't add user.")
    res.redirect('/register')
  }
)
