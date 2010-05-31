require.paths.unshift('spec', 'lib', 'spec/lib');
require("jspec");

function run(specs) {
  specs.forEach(function(spec){
    JSpec.exec('spec/' + spec + '.js');
  });
}

specs =[
    'config.spec'
    ];


run(specs);

JSpec.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true }).report();

