// SCSS/SASS 'CSS' wrapper for SocketStream 0.3

var fs = require('fs');
var sass = require('node-sass');

exports.init = function(root, config) {
  return {
    name: 'SCSS',
    extensions: ['sass', 'scss'],
    assetType: 'css',
    contentType: 'text/css',
    compile: function(path, options, cb) {      
      // Get dir from path to enable @include commmand
      var dir = path.split('/'); dir.pop();
      var input = fs.readFileSync(path, 'utf8');
      var compress = options && options.compress;
      
      sass.render({
        file: path,
        success: cb,
        error: function(err) {
          console.error(err);
        },
        outputStyle: compress ? 'compressed' : 'nested'
      });
    }
  };
};
