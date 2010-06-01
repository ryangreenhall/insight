describe 'Array'
  describe '#sum'
    it 'should return the sum of values in the array'
      1..5.sum.should.eql 15
      [1.5, 3.3].sum.should.eql 4.8
    end
  end

  describe '#avg'
    it 'should return the average of values in the array'
      1..5.avg.should.eql 3
    end
  end

  describe '#min'
    it 'should return the smallest value'
      [3,2,34,4,2].min.should.eql 2
    end

    it 'should return null when empty'
      [].min.should.be_null
    end
  end

  describe '#max'
    it 'should return the largest value'
      [2,3,2,3,4,44].max.should.eql 44
    end

    it 'should return null when empty'
      [].max.should.be_null
    end
  end
end

