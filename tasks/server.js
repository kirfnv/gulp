'use strict';

const
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();

module.exports = function(options) {
    return function() {
        return ([
            browsersync.init({
                server: {
                    baseDir: options.baseDir
                }
            }),

            gulp.watch(options.html+'index.html').on('change', browsersync.reload),
            gulp.watch(options.css+'app.css').on('change', browsersync.reload),
            gulp.watch(options.js+'app.js').on('change', browsersync.reload)
        ]);
    };
};
