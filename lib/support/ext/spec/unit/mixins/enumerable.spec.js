
describe 'Enumerable'
  describe '#map()'
    it 'should map an object'
      { foo: 1, bar: 2 }.map(function(x){ return x + 1 }).should.eql [2, 3]
    end
    
    it 'should support a given context'
      var obj = { foo: 41 }
      { foo: 1 }.map(function(x){ return x + this.foo }, obj).should.eql [42]
    end

    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.map(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should support short-hand function syntax'
      { foo: 1 }.map('a + 1').should.eql [2]
    end
  end

  describe '#filter()'
    it 'should filter the object'
      { foo: 'bar', foo2: 'baz' }.filter(function (x) { return x === 'bar' }).should.eql { foo: 'bar' }
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
       {foo: 'bar', foo2: 'baz' }.filter(function (x) { return x === this.foo }, obj).should.eql { foo: 'bar' }
    end

    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.filter(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should be aliased as #select()'
      {}.select.should.equal {}.filter
    end

    it 'should support short-hand function syntax'
      { foo: 'bar' }.filter('.length > 3').should.eql {}
    end
  end

  describe '#every()'
    it 'should return true if every satisfies the provided testing function'
      { foo: 'bar', baz: 'bar' }.every(function (x) { return x === 'bar' }).should.be_true
    end

    it 'should return false if at least one property does not satisfy the provided testing function'
      { foo: 'bar', baz: 'baz' }.every(function (x) { return x === 'bar' }).should.be_false
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', foo2: 'bar'}.every(function (x) { return x === this.foo }, obj).should.be_true
    end

    it 'should value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.every(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should be aliased as #all()'
      {}.every.should.equal {}.all
    end

    it 'should support short-hand function syntax'
      { foo: 'bar' }.every('=== "bar"').should.be_true
    end
  end

  describe '#some()'
    it 'should return true if at least one property satisfies the provided testing function'
      { foo: 'bar', baz: 'baz' }.some(function (x) { return x === 'bar' }).should.be_true
    end

    it 'should return false if no property satisfies the provided testing function'
      { foo: 'barrr', baz: 'baz' }.some(function (x) { return x === 'bar' }).should.be_false
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', bar: 'baz'}.some(function (x) { return x === this.foo }, obj).should.be_true
    end

    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.some(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should be aliased as #any()'
      {}.some.should.equal {}.any
    end

    it 'should support short-hand function syntax'
      { foo: 'bar' }.some('=== "bar"').should.be_true
    end
  end

  describe '#none()'
    it 'should return true if none evaluate to true'
      {a: 1, b:2, c: 3}.none(function(n){ return n > 5 }).should.be_true
    end

    it 'should return false when any evaluate to true'
      {a: 1, b:2, c: 10}.none(function(n){ return n > 5 }).should.be_false
    end

    it 'should allow optional context'
      var obj = { foo: 5 }
      { a: 1, b:2, c: 10 }.none(function(n){ return n > this.foo }, obj).should.be_false
    end
    
    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.none(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should work with shorthand function syntax'
      { a: 1, b:2, c: 10 }.none('a > 5').should.be_false
    end
  end

  describe '#reject()'
    it 'should return an object containing only the properties the testing function returned false for'
      {foo: 'bar', baz: 'baz'}.reject(function (x) { return x === 'bar' }).should.eql {baz: 'baz'}
    end

    it 'should support a given context'
      var obj = { foo: 'bar' }
      {foo: 'bar', bar: 'baz'}.reject(function (x) { return x === this.foo }, obj).should.eql {bar: 'baz'}
    end

    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.reject(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should support short-hand function syntax'
      { foo: 'bar' }.reject('=== "bar"').should.eql {}
    end
  end

  describe '#detect()'
    it 'should return the first element the given function returns true for'
      {a: 1, b: 2, c: 3}.detect(function (e) { return e === 3 }).should.eql 3
    end

    it 'should return undefined if the given function never returns true'
      {a: 1, b: 2, c: 3}.detect(function(){}).should.be_undefined
    end

    it 'should accept optional context'
      var obj = { foo: function(){ return true }}
      obj.should.receive('foo', 'once')
      {a: 1, b: 2, c: 3}.detect(function(){ return this.foo() }, obj).should.eql 1
    end
    
    it 'should pass value, key, then the object itself'
      var obj = { foo: 'bar' }, args
      obj.detect(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end

    it 'should allow shorthand function syntax'
      {a: 1, b: 2, c: 3}.detect('=== 3').should.eql 3
    end

    it 'should be aliased as #find()'
      {}.detect.should.equal {}.find
    end
  end

  describe '#reduce()'
    it 'should iterate with memo object'
      var evens = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}.reduce(function(evens, n){
        if (n % 2 === 0) evens.push(n)
        return evens
      }, [])
      evens.should.eql [2,4,6,8,10]
    end

    it 'should work with shorthand function syntax'
      {a: 1, b: 2, c: 3, d: 4, e: 5}.reduce('a + b', 0).should.eql 15
    end

    it 'should pass the first value when no memo is supplied'
      ['foo', 'bar', 'baz'].reduce(function(a, b){ return a + ' ' + b }).should.eql 'foo bar baz'
      { a: 'foo', b: 'bar', c: 'baz' }.reduce(function(a, b){ return a + ' ' + b }).should.eql 'foo bar baz'
    end

    it 'should start from the correct value when a memo object is given'
      ['foo', 'bar', 'baz'].reduce(function(a, b){ return a + ' ' + b }, 'start:').should.eql 'start: foo bar baz'
      { foo: 'bar', baz: 'raz' }.reduce(function(a, b){ return a + ' ' + b }, 'start:').should.eql 'start: bar raz'
    end
    
    it 'should be aliased as #inject()'
      {}.reduce.should.equal {}.inject
    end
  end

end
