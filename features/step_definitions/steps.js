const assert = require('cucumber-assert')
const Url = require('url')
const extend = require('xtend')

const config = require('../../config')

module.exports = function () {

  this.Given('I am viewing the page at "$string"', function (pathname) {
    browser.url(`http://localhost:5050${pathname}`) // hardcoded localhost
    // real world example below
    // browser.url(Url.format(extend(config.proxy, { pathname: pathname })))
  })

  this.When('I enter "$string" into the "$string" input', function (value, name) {
    browser.setValue(`input[name=${name}]`, value)
  })

  this.When('I click on the input with value "$string"', function (value) {
    browser.click(`input[value="${value}"]`)
  })

  this.Then('I can see the list item "$string"', function (text, callback) {
    const listItemExists = browser.waitForExist(`li=${text}`)
    assert.equal(listItemExists, true, callback)
  })

  this.Then('I am redirected to the "$string" page', function (pathname, callback) {
    browser.waitForExist('body')
    const url = browser.getUrl()
    assert.equal(Url.parse(url).pathname, pathname, callback)
  })
}
