
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext = {
  
  /**
   * Version.
   */
  
  version: '0.3.0',
  
  /**
   * Extend _obj_ with _props_, where all _props_
   * are not enumerable.
   *
   * @param  {mixed} obj
   * @param  {hash} props
   * @api public
   */
  
  extend: function(obj, props) {
    Object.getOwnPropertyNames(props).forEach(function(prop){
      var descriptor = Object.getOwnPropertyDescriptor(props, prop)
      descriptor.enumerable = false
      Object.defineProperty(obj, prop, descriptor)
    })
  },
  
  /**
   * Warn using the given _msg_, the same message
   * is only displayed once.
   *
   * @param  {string} msg
   * @api private
   */
  
  warns: [],
  warn: function(msg) {
    if (this.warns.indexOf(msg) === -1)
      this.warns.push(msg),
      process.binding('stdio').writeError('Warning: ' + msg + '\n')
  }
}

require('ext/core_ext')
require('ext/md5')
require('ext/base64')
global.merge(require('ext/printf'))

