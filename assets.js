// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV
module.exports = {
    development: {
        js: [
            'js/jquery.min.js',
            'js/swig.min.js',
            'js/html5shiv.js',
            'js/init.js'
        ],
        css: [
            'css/bootstrap.min.css',
            'css/grid.css',
            'css/styles.css',
            'css/ie.css'
        ]
    },
    production: {
        js: [],
        css: []
    }
}