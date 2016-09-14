const sodium = require('sodium').api

module.exports = {
  getHash: getHash,
  verifyUser: verifyUser
}

//Passes the password entered into the password field, and receives back a hash.

function getHash (password) {
  const passwordBuffer = new Buffer(password, 'utf8')
  const hash = sodium.crypto_pwhash_str(
    passwordBuffer,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  )

  return hash
}

// This takes the user and the password, it then returns two hashes as buffers. One for username and one for password. This can be compared to the new hashes deliverd from getHash for credentials just entered.

function verifyUser (user, password) {
  const hash = new Buffer(user.hash, 'utf8')
  const passwordBuffer = new Buffer(password, 'utf8')
  return sodium.crypto_pwhash_str_verify(hash, passwordBuffer)
}
