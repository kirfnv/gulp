'use strict';

const
    gulp = require('gulp'),
    imgmin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
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
                            title: 'Images',
                            message: err.message
                        };
                    })
                }))
                .pipe(imgmin(options.imgmin))
                .pipe(gulp.dest(options.dest))
                .pipe(browsersync.stream())
        );
    };
};
