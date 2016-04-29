'use strict';

const
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    ts = require('gulp-typescript'),
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
                            title: 'Typescript',
                            message: err.message
                        };
                    })
                }))
                .pipe(gulpIf(isDevelopment, sourcemap.init()))
                .pipe(ts(options.project))
                .pipe(gulpIf(isDevelopment, sourcemap.write()))
                .pipe(gulp.dest(options.dest))
                .pipe(browsersync.stream())
        );
    };
};
