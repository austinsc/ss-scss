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

      var sss = stylus(input, {filename: path, paths: [dir.join('/')]});
      for (var c in config) {
        sss.set(c, config[c]);
      }

      sss.use(nib())
        .render(function(err, css) {
        if (err) {
          var message = '! - Unable to compile Stylus file %s into CSS';
          console.log(String.prototype.hasOwnProperty('red') && message.red || message, path);
          console.error(err);
        }
        cb(css);
      });
    }
  };
};
