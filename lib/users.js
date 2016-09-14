const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

const crypto = require('./crypto')

module.exports = {
  create: create,
  deserialize: deserialize,
  exists: exists,
  getById: getById,
  getByName: getByName,
  serialize: serialize
}

// When a user registers, their password is hashed and then returned. The hashed password is then added to the DB alongside their username

function create (username, password) {
  const hash = crypto.getHash(password)

  return knex('users')
    .insert({
      username: username,
      hash: hash
    })
}


//function checking if username exist, perfoming count on id column (converting them to numbers), comparing each username's id if exists.

function exists (username) {
  return knex('users')
    .count('id as n')
    .where('username', username)
    .then(function (count) {
      return count[0].n > 0
    })
}

//function accesses the users DB and then selects the id and username columns. It then checks through the id column and if it finds an id match it returns it

function getById (id) {
  return knex('users')
    .select('id', 'username')
    .where('id', id)
}

//function accesses the users DB and then selects the id and username columns. It then checks through the username column and if it finds a username match it returns it.

function getByName (username) {
  return knex('users')
    .select()
    .where('username', username)
}

// Function first runs the getByID function and waits for response. When response arrives back it checks if a user has been found. If not, the function runs the callback with null for err, and a false response. If there is a user it runs the callback with null for err and the users details as response.

//The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserialize function.

function deserialize (id, done) {
  getById(id)
    .then(function (users) {
      if (users.length === 0) {
        return done(null, false)
      }
      done(null, users[0])
    })
    .catch(function (err) {
      done(err, false)
    })
}
//
function serialize (user, done) {
  done(null, user.id)
}
