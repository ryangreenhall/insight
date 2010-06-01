
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// --- Extensions

Ext.extend(Object.prototype, {

  /**
   * Return own property keys.
   *
   *  { foo: 'bar' }.keys
   *  // => ['foo']
   *
   * @return {array}
   * @api public
   */

  get keys() {
    return Object.keys(this)
  },
  
  /**
   * Set the keys property, Object#keys will
   * then return the given _val_ instead of
   * the object's property keys.
   *
   * @param  {mixed} val
   * @api public
   */
  
  set keys(val) {
    this.__defineGetter__('keys', function(){ return val })
    this.__defineSetter__('keys', arguments.callee)
  },

  /**
   * Return own property values.
   *
   *  { foo: 'bar' }.values
   *  // => ['bar']
   *
   * @return {array}
   * @api public
   */

  get values() {
    return this.keys.map('key -> this[key]', this)
  },
  
  /**
   * Set the values property, Object#values will
   * then return the given _val_ instead of
   * the object's values.
   *
   * @param  {mixed} val
   * @api public
   */
  
  set values(val) {
    this.__defineGetter__('values', function(){ return val })
    this.__defineSetter__('values', arguments.callee)
  },

  /**
   * Passes _this_ to the given function and then returns _this_.
   * Allows to *tap* into into function call chains.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  tap: function (fn, context) {
    fn.call(context || this, this)
    return this
  },

  /**
   * Merges all values from the given _obj_.
   *
   * @param  {object} obj
   * @return {object}
   * @api public
   */

  merge: function (obj) {
    obj = obj || {}
    obj.each(function(val, key) {
      this[key] = val
    }, this)
    return this
  },
  
  /**
   * Perform a deep merge with the given _obj_.
   *
   * @param  {object} obj
   * @return {object}
   * @api public
   */
  
  mergeDeep: function(obj) {
    var target = this
        obj = obj || {}
    obj.each(function(val, key){
      if (typeof obj[key] === 'object')
        target = (target[key] = target[key] || {}).mergeDeep(val)
      else
        target[key] = val
    })
    return this
  },

  /**
   * Check whether this object has a functioned named _key_.
   *
   * @param {string} key
   * @return {object}
   * @api public
   */

  respondsTo: function(key) {
    return typeof this[key] === 'function'
  },
  
  /**
   * Copy _orig_ property to _alias_,
   * returning this object.
   *
   *   String.prototype.alias('toString', 'to_s')
   *
   * @param  {string} orig
   * @param  {string} alias
   * @return {mixed}
   * @api public
   */
  
  alias: function(orig, alias) {
    this[alias] = this[orig]
    return this
  },
  
  /**
   * Join with the given _str_ or ','.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */
  
  join: function(str) {
    return this.values.join(str)
  }
})

