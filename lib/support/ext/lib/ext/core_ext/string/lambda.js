
// ext.js - String - Lambda - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Function cache.
 */

var cache = {}

// --- Extensions

Ext.extend(String.prototype, {

  /**
   * Evaluates the Lambda expression.
   *
   *   'x -> x + 1'.lambda(1)
   *   // => 2
   *
   *   'x y -> x + y'.lambda(1, 2)
   *   // => 3
   *
   * Lambda expressions support currying:
   *
   *   'x -> y -> x + y'.lambda(1)
   *   // => [Function]
   *
   *   'x -> y -> x + y'.lambda(40)(2)
   *   // => 42
   *
   * Lambda expression additionally support shortforms:
   *
   *   '+'.lambda(1,2)
   *   // => 3
   *
   *   '+ 5'.lambda(2)
   *   // => 7
   *
   *   '6 /'.lambda(2)
   *   // => 3
   *
   *   '.length'.lambda([1,2,3])
   *   // => 3
   *
   *   '[1]'.lambda([1,2,3])
   *   // => 2
   *
   * Evaluated Lambda expressions are being cached for efficiency.
   *
   * @return {function}
   * @api public
   */
  
  get lambda() {
    if (cache[this]) return cache[this]

    var params = [],
        body = this,
        sections = this.split(/\s*->\s*/m)

    if (sections.length > 1)
      sections.each(function(){
        body = sections.pop()
        params = sections.pop().split(/\s*,\s*|\s+/m)
        sections.push('(function (' + params + ') { return (' + body + ') })')
      })
    else {
      var left = body.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=|(\[.+\]))/m),
          right = body.match(/[~+\-*\/%&|\^\.=<>!]\s*$/m)
      if (left)
        params.push('$1'),
        body = '$1' + body
      if (right)
        params.push('$2'),
        body = body + '$2'
    }

    try {
      return cache[this] = new Function(params, 'return (' + body + ')')
    } catch (e) {
      throw new SyntaxError('Invalid lambda expression: `' + this + '` (' + e.message + ')')
    }
  },
  
  /**
   * Calls the function in the given context with the given arguments.
   *
   * @param {object} context
   * @return {mixed}
   * @api public
   */

  call: function(context) {
    return this.lambda.apply(context, arguments.values.slice(1))
  },
  
  /**
   * Calls the function in the given context with the given Array or indexed
   * object of arguments.
   *
   * @param {object} context
   * @param {array, object} args
   * @return {mixed}
   * @api public
   */

  apply: function(context, args) {
    return this.lambda.apply(context, args)
  }
})
