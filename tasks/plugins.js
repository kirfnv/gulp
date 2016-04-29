'use strict';

const
    gulp = require('gulp'),
    mincss = require('gulp-csso'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    browsersync = require('browser-sync').create();

module.exports = function(options) {
    return function() {
        return ([
            gulp.src(options.srcJS)
                .pipe(plumber({
                    errorHandler: notify.onError(function(err) {
                        return {
                            title: 'Plugins',
                            message: err.message
                        };
                    })
                }))
                
                .pipe(concat(options.concat.js))
                .pipe(gulp.dest(options.destJS)),

            gulp.src(options.srcCSS)
                .pipe(mincss(options.mincss))
                .pipe(concat(options.concat.css))
                .pipe(gulp.dest(options.destCSS))
        ]);
    };
};
