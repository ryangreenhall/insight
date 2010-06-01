require.paths.unshift(__dirname + '/support/ext/lib');
require.paths.unshift(__dirname + '/support/haml/lib');
require.paths.unshift(__dirname + '/support/sass/lib');
require.paths.unshift(__dirname + '/support/multipart/lib');
require.paths.unshift(__dirname);
require('ext');
Class = require(__dirname + '/support/class/lib/class').Class;
require(__dirname + '/express/core');
