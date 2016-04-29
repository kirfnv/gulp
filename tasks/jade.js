'use strict';

const
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browsersync = require('browser-sync').create();

module.exports = function(options) {
    return function() {
        return (
            gulp.src(options.src)
                .pipe(plumber({
                    errorHandler: notify.onError(function(err) {
                        return {
                            title: 'Jade',
                            message: err.message
                        };
                    })
                }))
                .pipe(jade(options.jade))
                //.pipe(rename(options.rename))
                .pipe(gulp.dest(options.dest))
                .pipe(browsersync.stream())
        );
    };
};
