const bodyParser = require('body-parser')
const express = require('express')
const authenticate = require('express-jwt')
const jwt = require('jsonwebtoken')

const crypto = require('../lib/crypto')
const users = require('../lib/users')

const router = express.Router()
module.exports = router
router.use(bodyParser.json())

// This route is public. It accepts a POST request with JSON body:
// {
//   "username": "foo",
//   "password": "bar"
// }
// This should obviously be sent via HTTPS.
router.post('/authenticate', (req, res) => {
  users.getByName(req.body.username)
    .then(userList => {
      if (userList.length === 0) {
        return res.json({ message: 'Authentication failed. User not found.' })
      }

      const user = userList[0]
      if (!crypto.verifyUser(user, req.body.password)) {
        return res.json({ message: 'Authentication failed. Wrong password.' })
      }

      const token = jwt.sign({ id: user.id }, req.app.get('AUTH_SECRET'), {
        expiresIn: 60 * 60 * 24
      })

      res.json({
        message: 'Authentication successful.',
        token: token
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Authentication failed due to a server error.',
        error: err.message
      })
    })
})

// Protect all routes beneath this point
router.use(
  authenticate({
    secret: req => req.app.get('AUTH_SECRET')
  }),
  (err, req, res, next) => {
    if (err) {
      return res.status(403).json({
        message: 'Access to this resource was denied.',
        error: err.message
      })
    }
    next()
  }
)

// These routes are protected
router.get('/something', (req, res) => {
  res.json('Yup.')
})
