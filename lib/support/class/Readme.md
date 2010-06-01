
# Class.js

  High performance classical inheritance for **node.js**.

## Installation

  Install the [Kiwi package manager for nodejs](http://github.com/visionmedia/kiwi)
  and run:
  
      $ kiwi -v install class

## About Class.js

Without wasting performance on cross-browser functionality,
class.js is an **extremely light** (_10-ish SLOC_) class implementation.

By utilizing idiomatic prototypal inheritance techniques this
implementation is **very fast**. There is no wrapping or _super_ 
hacks involved.

## Examples

    var Class = require('class').Class

    var User = new Class({
      constructor: function(name){
        this.name = name
      },
      toString: function(){
        return '[User ' + this.name + ']'
      }
    })
    
    var Admin = User.extend({
      extend: { name: 'Admin' },
      constructor: function(name) {
        User.call(this, name.toUpperCase())
      }
    })
    
    puts(new Admin('tj'))
    // => "[User TJ]"
    
    puts(Admin.name)
    // => "Admin"
    
## Benchmarks

Currently the benchmarks compare regular **prototypal inheritance**,
node's **sys.inherits()**, and **class.js**. Each subclasses _User_
as _Admin_, and creates an instance **500,000 times**.

    λ  class.js: node benchmark.js

    running 500000 times

    prototype : 68 ms
    sys.inherits() : 1512 ms
    class.js : 1531 ms

## Running Tests

Specs are written using [JSpec](http://jspec.info), however
no additional installations are required as JSpec is froozen
to _spec/lib_, just simply run:

    $ make test

## License 

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.