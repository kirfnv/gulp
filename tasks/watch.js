'use strict';

const
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();

module.exports = function(options) {
    return function() {
        return ([
            gulp.watch(options.jade, ['jade']),
            gulp.watch(options.stylus, ['stylus']),
            gulp.watch(options.less, ['less']),
            gulp.watch(options.sass, ['sass']),
            gulp.watch(options.babel, ['babel']),
            gulp.watch(options.typescript, ['typescript']),
            gulp.watch(options.coffee, ['coffee'])
        ]);
    };
};
