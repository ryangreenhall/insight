
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Object.prototype, {

  /**
   * Invokes the given function for each key. Returns _this_.
   *
   * Required to support the Enumerable mixin.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  each: function (fn, context) {
    this.keys.each(function (key) {
      fn.call(context, this[key], key, this)
    }, this)
    return this
  }

})

Ext.extend(Object.prototype, require('ext/mixins/enumerable'))

