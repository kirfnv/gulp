'use strict';

const
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();

module.exports = function(options) {
    return function() {
        return (
            gulp.src(options.src)
                .pipe(gulp.dest(options.dest))
                .pipe(browsersync.stream())
        );
    };
};
