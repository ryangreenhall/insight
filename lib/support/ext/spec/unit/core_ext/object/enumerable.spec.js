
describe 'Object'
  describe '#each()'
    it 'should iterate the object'
      var obj = { foo: 1, bar: 1, baz: 1}, result = 0
      obj.each(function (x) { result += x })
      result.should.eql 3
    end
    
    it 'should iterate own properties only'
      var err = new Error('wahoo')
      err.foo = 'bar'
      var keys = []
      err.each(function(val, key){ keys.push(key) })
      keys.should.eql ['message', 'stack', 'foo']
    end

    it 'should support a given context'
      var obj = { foo: 1, bar: 1, baz: 1}, result = 0, context = { foo: 1 }
      obj.each(function (x) { result += x + this.foo }, context)
      result.should.eql 6
    end

    it 'should pass the arguments in the expected order'
      var obj = { foo: 'bar' }, args
      obj.each(function () { args = arguments })
      args[0].should.eql 'bar'
      args[1].should.eql 'foo'
      args[2].should.eql obj
    end
    
    it 'should return itself'
      var obj = { foo: 'bar' }
      obj.each(function(){}).should.equal obj
    end
  end
end

