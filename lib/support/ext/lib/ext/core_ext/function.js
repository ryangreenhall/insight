
// ext.js - Function - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Ext.extend(Function.prototype, {

  /**
   * Works like Function#curry() however accepts
   * a _context_ in which to evaluate the function.
   *
   * @param  {mixed} context
   * @param  {mixed} ...
   * @return {function}
   * @api public
   */

  bind: function(context) {
    var self = this,
        args = arguments.values.drop(1)
    return function(){
      return self.apply(context, args.concat(arguments.values))
    }
  },
  
  /**
   * Returns a new function with the given args
   * "bound" to it.
   *
   * @param  {mixed} ...
   * @return {function}
   * @api public
   */
  
  curry: function() {
    if (!arguments.length) return this
    var self = this,
        args = arguments.values
    return function(){
      return self.apply(null, args.concat(arguments.values))
    }
  }
})
