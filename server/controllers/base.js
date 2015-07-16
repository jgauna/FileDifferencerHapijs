var settings = require('../config/settings');
var server = require(settings.rootPath + '/server');
var swig = require('swig');
var config = require('../config/settings');

module.exports = {
    index: {
        handler: function(request, reply) {
            reply.view('index', {
                title: 'Agile Engine Test Home (Diff)'
            });
        },
        id: 'index'
    },
    uploadFiles: {
        handler: function(req, reply) {
            var uploadResult = server.methods.doFileComparation(req, function(err, result) {
                if (err) {
                    reply(err).code(500);
                } else {
                    reply(result).code(200);
                }
            });
        },
        payload: {
            output: 'stream',
            parse: false
        },
        id: 'uploadFiles'
    },
    missing: {
        handler: function(request, reply) {
            reply.redirect('http://' + config.host + config.port);
        },
        id: '404'
    }
}