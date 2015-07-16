/**
 * Dependencies.
 */
var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

module.exports = [{
    method: 'GET',
    path: '/',
    config: controller.base.index
}, {
    method: 'POST',
    path: '/uploadFiles',
    config: controller.base.uploadFiles
}, {
    method: 'GET',
    path: '/{path*}',
    config: controller.base.missing
}, {
    method: 'GET',
    path: '/partials/{path*}',
    config: controller.assets.partials
}, {
    method: 'GET',
    path: '/images/{path*}',
    config: controller.assets.images
}, {
    method: 'GET',
    path: '/uploads/{path*}',
    config: controller.assets.uploads
}, {
    method: 'GET',
    path: '/css/{path*}',
    config: controller.assets.css
}, {
    method: 'GET',
    path: '/js/{path*}',
    config: controller.assets.js
}, {
    method: 'GET',
    path: '/bower_components/{path*}',
    config: controller.assets.bower
}];