
describe 'Object'
  describe '#alias()'
    it 'should copy a property'
      Object.prototype.foo = 'yay'
      {}.foo.should.eql 'yay'
      Object.prototype.alias('foo', 'bar')
      {}.bar.should.eql 'yay'
      {}.bar.should.equal {}.foo
      delete Object.prototype.foo
      delete Object.prototype.bar
    end

    it 'should be chainable'
      Object.prototype.a = 'yay'
      {}.a.should.eql 'yay'
      Object.prototype
        .alias('a', 'b')
        .alias('a', 'c')
        .alias('a', 'd')
      {}.b.should.eql 'yay'
      {}.c.should.eql 'yay'
      {}.d.should.eql 'yay'
      delete Object.prototype.a
      delete Object.prototype.b
      delete Object.prototype.c
      delete Object.prototype.d
    end
  end
  
  describe '#join()'
    describe 'without an argument'
      it 'should join with commas'
        { foo: 'bar', baz: 'rawr' }.join().should.eql 'bar,rawr' 
      end
    end
    
    describe 'with an argument'
      it 'should join with the given string'
        { foo: 'bar', baz: 'rawr' }.join(' ').should.eql 'bar rawr'
      end
    end
  end
  
  describe '#keys'
    it 'should return own property keys'
      { foo: 'bar', baz: 'raz' }.keys.should.eql ['foo', 'baz']
    end
    
    it 'should allow being written to'
      var o = { keys: 'foo' }
      o.keys.should.eql 'foo'
      o.keys = 'bar'
      o.keys.should.eql 'bar'
      o.propertyIsEnumerable('keys').should.be_true
    end
  end

  describe '#values'
    it 'should return an array containing all the values of an object'
      { foo: 'bar', baz: 'raz' }.values.should.eql ['bar', 'raz']
    end
    
    it 'should allow being written to'
      var o = { values: 'foo' }
      o.values.should.eql 'foo'
      o.values = 'bar'
      o.values.should.eql 'bar'
      o.propertyIsEnumerable('values').should.be_true
    end
  end

  describe '#tap()'
    it 'should allow to tap into function call chains'
      var result
      'user_names'.camelcase.tap(function (x) { result = x }).singular.should.eql 'UserName'
      (result == 'UserNames').should.be_true
    end

    it 'should support a given context'
      var result, obj = { foo: 'bar' }
      'user_names'.camelcase.tap(function (x) { result = (x + this.foo) }, obj).singular.should.eql 'UserName'
      result.should.eql 'UserNamesbar'
    end
  end

  describe '#merge()'
    it 'should merge the given object and return _this_'
      var a = {}
      var b = { foo: 'bar' }
      a.merge(b).should.equal a
      a.foo.should.eql 'bar'
    end

    it 'should give the object being merged precendence'
      var a = { foo: 'foo' }
      var b = { foo: 'bar' }
      a.merge(b).should.equal a
      a.foo.should.eql 'bar'
    end
    
    it 'should work when an undefined object is passed'
      { foo: 'bar' }.merge().should.eql { foo: 'bar' }
    end
  end
  
  describe '#mergeDeep()'
    it 'should perform a deep merge and return _this_'
      var a = { user: { name: { first: 'tj' }}}
      var b = { user: { name: { last: 'holowaychuk' }}}
      a.mergeDeep(b).should.equal a
      a.should.eql { user: { name: { first: 'tj', last: 'holowaychuk' }}}
    end
    
    it 'should give the object being merged precendence'
      var a = { user: { name: { first: 'tj' }}}
      var b = { user: { name: { first: 'simon' }}}
      a.mergeDeep(b).should.equal a
      a.should.eql { user: { name: { first: 'simon' }}}
    end
    
    it 'should work when keys are not available on the source object'
      var a = {}
      var b = { user: { name: { first: 'simon' }}}
      a.mergeDeep(b).should.equal a
      a.should.eql { user: { name: { first: 'simon' }}}
    end
    
    it 'should work when an undefined object is passed'
      { foo: 'bar' }.mergeDeep().should.eql { foo: 'bar' }
    end
  end

  describe '#respondsTo()'
    it 'should return true if the object responds to the given key'
      { f: function () {} }.respondsTo('f').should.be_true
    end

    it 'should return true when the object inherits a function'
      ''.respondsTo('toString').should.be_true
    end

    it 'should return false if the object does not respond to the given key'
      {}.respondsTo('f').should.be_false
    end
  end
end

