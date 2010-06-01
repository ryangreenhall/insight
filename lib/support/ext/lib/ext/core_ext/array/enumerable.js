
// ext.js - Array - Iterators - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Array.prototype, {

  /**
   * Shorthand for Array#forEach()
   *
   * Required to support the Enumerable mixin.
   *
   * @api public
   */

  each: Array.prototype.forEach

})

Ext.extend(Array.prototype, require('ext/mixins/enumerable'))

