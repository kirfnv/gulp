'use strict';

const
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    babel = require('gulp-babel'),
    sourcemap = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browsersync = require('browser-sync').create();

let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    return function() {
        return (
            gulp.src(options.src)
                .pipe(plumber({
                    errorHandler: notify.onError(function(err) {
                        return {
                            title: 'Babel',
                            message: err.message
                        };
                    })
                }))
                .pipe(gulpIf(isDevelopment, sourcemap.init()))
                .pipe(babel(options.babel))
                .pipe(gulpIf(isDevelopment, sourcemap.write()))
                .pipe(gulp.dest(options.dest))
                .pipe(browsersync.stream())
        );
    };
};
