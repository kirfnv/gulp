'use strict';

const
    gulp = require('gulp');

module.exports = function(options) {
    return function() {
        return ([
            gulp.src(options.src.jquery)
                .pipe(gulp.dest(options.dest.jquery)),

            gulp.src(options.src.bourbon)
                .pipe(gulp.dest(options.dest.bourbon)),

            gulp.src(options.src.es5shim)
                .pipe(gulp.dest(options.dest.es5shim)),

            gulp.src(options.src.html5shiv)
                .pipe(gulp.dest(options.dest.html5shiv)),

            gulp.src(options.src.respond)
                .pipe(gulp.dest(options.dest.respond)),

            gulp.src(options.src.bootstrap.css)
                .pipe(gulp.dest(options.dest.bootstrap.css)),

            gulp.src(options.src.bootstrap.js)
                .pipe(gulp.dest(options.dest.bootstrap.js)),

            gulp.src(options.src.bootstrap.fonts)
                .pipe(gulp.dest(options.dest.bootstrap.fonts)),
        ]);
    };
};
