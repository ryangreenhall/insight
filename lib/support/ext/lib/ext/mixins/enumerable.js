
// ext.js - Enumerable - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Callback short-hand patterns.
 */

var operator = /^[^\w]/,
    method = /^\w+\(/

/**
 * Normalize callback _fn_.
 *
 * @param  {string, function} fn
 * @return {function}
 * @api private
 */

function callback(fn) {
  if (fn instanceof Function) return fn
  return (operator.test(fn) || method.test(fn) || fn.includes('->') ? fn : 'a b c -> ' + fn).lambda
}

// --- Enumerable

/**
 * Returns true if at least one property satisfies the provided testing function.
 *
 * @param {function} fn
 * @param {object} context
 * @return {object}
 * @api public
 */

exports.some = function (fn, context) {
  var state = false,
      fn = callback(fn)
  this.each(function(val, key) {
    if (fn.call(context, val, key, this))
      state = true
  }, this)
  return state
}

/**
 * Returns an array with values mapped to the returnvalue of _fn_
 * on each iteration.
 *
 * @param {function} fn
 * @param {object} context
 * @return {array}
 * @api public
 */

exports.map = function (fn, context) {
  var mapped = [],
      fn = callback(fn)
  this.each(function(val, key) {
    mapped.push(fn.call(context, val, key, this))
  }, this)
  return mapped
}

/**
 * Returns a new object containing the keys the given function returned true for.
 *
 * @param {function} fn
 * @param {object} context
 * @return {object}
 * @api public
 */

exports.filter = function (fn, context) {
  var filtered = Object.create(Object.getPrototypeOf(this)),
      fn = callback(fn)
  this.each(function(val, key) {
    if (fn.call(context, val, key, this))
      filtered.push ? filtered.push(val) : filtered[key] = val
  }, this)
  return filtered
}

/**
 * Returns a new object without the keys the given function returned true for.
 *
 * @param {function} fn
 * @param {object} context
 * @return {object}
 * @api public
 */

exports.reject = function (fn, context) {
  var rejected = Object.create(Object.getPrototypeOf(this)),
      fn = callback(fn)
  this.each(function(val, key) {
    if (!fn.call(context, val, key, this))
      rejected.push ? rejected.push(val) : rejected[key] = val
  }, this)
  return rejected
}

/**
 * Returns true if every property satisfies the provided testing function.
 *
 * @param {function} fn
 * @param {object} context
 * @return {object}
 * @api public
 */

exports.every = function (fn, context) {
  var state = true,
      fn = callback(fn)
  this.each(function(val, key) {
    if (!fn.call(context, val, key, this))
      state = false
  }, this)
  return state
}

/**
 * Returns the first value for which the passed function returns true.
 *
 *  [1,2,3].detect(function (e) { return e === 2 })
 *  // => 2
 *
 *  [1,2,3].detect('=== 2')
 *  // => 2
 *
 * @param  {function} fn
 * @param  {object} context
 * @return {mixed}
 * @api public
 */

exports.detect = function (fn, context) {
  var ret,
      fn = callback(fn)
  this.each(function(val, key, self) {
    if (!ret && fn.call(context, val, key, self))
      ret = val
  })
  return ret
}

/**
 * Check if _fn_ always evaluates to false, with
 * optional evaluation _context_.
 *
 * @param  {function} fn
 * @param  {mixed} context
 * @return {bool}
 * @api public
 */

exports.none = function(fn, context) {
  var state = true,
      fn = callback(fn)
  this.each(function(val, key, self) {
    if (state)
      state = ! fn.call(context, val, key, self)
  })
  return state
}

/**
 * Reduce with optional _memo_ object, otherwise
 * the first value is passed.
 *
 *  [1,2,3,4].reduce(function(evens, n){
 *     if (n % 2 === 0) evens.push(n)
 *    return evens
 *  }, [])
 *  // => [2,4]
 *
 *  [1,2,3,4,5].reduce('a + b')
 *  // => 15
 *
 * @param  {function} fn
 * @param  {mixed} memo
 * @return {mixed}
 * @api public
 */

exports.reduce = function(fn, memo) {
  fn = callback(fn)
  this.each(function(val, key, self) {
    memo = memo === undefined
      ? val
      : fn(memo, val, key, self)
  })
  return memo
}

// --- Aliases

exports
  .alias('some', 'any')
  .alias('every', 'all')
  .alias('detect', 'find')
  .alias('filter', 'select')
  .alias('reduce', 'inject')
