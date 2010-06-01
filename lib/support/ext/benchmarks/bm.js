
require.paths.unshift(__dirname + '/../lib')
require('ext')

var path = process.argv[2],
    benchmarks = require(__dirname + '/' + path),
    times = benchmarks.n || 1

delete benchmarks.n

printf('\n      benchmarking %s %d time(s)\n\n', path, times)

benchmarks.each(function(fn, label){
  var start = +new Date
  fn()
  var duration = (+new Date - start) / 1000
  printf('%45s : %0.3f\n', label, duration)
})
