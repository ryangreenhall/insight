describe 'String'
  describe '#lambda'
    it 'should return a function'
      'x -> x + 1'.lambda.should.be_type 'function'
    end

    it 'should evaluate'
      'x -> x + 1'.lambda(1).should.eql 2
    end

    it 'should support multiple arguments'
      'x y -> x + y'.lambda(1, 2).should.eql  3
      'x,y -> x + y'.lambda(1, 2).should.eql  3
      'x, y -> x + y'.lambda(1, 2).should.eql 3
    end

    it 'should support currying'
      'x -> y -> x + 2 * y'.lambda(1).should.be_type 'function'
      'x -> y -> x + 2 * y'.lambda(1)(2).should.eql 5
    end

    it 'should support nested lambdas containing multiple arguments'
      'x -> y z -> x + y + z'.lambda(1)(2, 3).should.eql 6
      'x y -> z -> x + y + z'.lambda(1, 2)(3).should.eql 6
    end
    
    it 'should support nested lambdas with no arguments'
      'a b -> -> a + b'.lambda(1,2)().should.eql 3
    end

    it 'should support shortform operators'
      '+ 2'.lambda(1).should.eql  3
      '+'.lambda(1, 2).should.eql 3
      '6 /'.lambda(2).should.eql 3
      '.length'.lambda(1..10).should.eql 10
      '[1]'.lambda([13, 42]).should.eql 42
      '> 2'.lambda(3).should.be_true
      '--'.lambda(2).should.eql 1
      '!='.lambda(2, 3).should.be_true
      '!=='.lambda(2, 3).should.be_true
      '!!'.lambda(1).should.be_type 'boolean'
      '~~'.lambda(2.2).should.eql 2
      '||'.lambda(0, 1).should.eql 1
      '&'.lambda(0x13, 0x12).should.eql 18
      '^'.lambda(0x13, 0x12).should.eql 1
      '<<'.lambda(1, 2).should.eql 4
      '.toString()'.lambda({ toString: function () { return 'ok' } }).should.eql 'ok'
    end

    it 'should throw meaningful errors'
      -{ ';'.lambda }.should.throw_error SyntaxError, 'Invalid lambda expression: `;` (Unexpected token ;)'
    end
  end

  describe '#call()'
    it 'should execute the function in the given context with the given arguments'
      var obj = { incr: 3 }
      'x -> x + this.incr'.call(obj, 2).should.eql 5
    end
  end

  describe '#apply()'
    it 'should execute the function in the given context with the given array of arguments'
      var obj = { incr: 3 }
      'x -> x + this.incr'.apply(obj, [2]).should.eql 5
    end
  end
end
