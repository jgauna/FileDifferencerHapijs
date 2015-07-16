/**
 * Dependencies.
 */
var path = require('path');

// Defaults that you can access when you require this config.
module.exports = {
  rootPath: path.normalize(__dirname + '/../..'),
  port: 3000,
  host: '0.0.0.0'
};