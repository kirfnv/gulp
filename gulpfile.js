'use strict';

const
    gulp         = require('gulp'),
    jade         = require('gulp-jade'),
    stylus       = require('gulp-stylus'),
    babel        = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    imgmin       = require('gulp-imagemin'),
    concat       = require('gulp-concat'),
    mincss       = require('gulp-csso'),
    pngquant     = require('imagemin-pngquant'),
    rename       = require('gulp-rename'),
    sourcemap    = require('gulp-sourcemaps'),
    ts           = require('gulp-typescript'),
    typescript   = require('typescript'),
    gulpIf       = require('gulp-if'),
    browsersync  = require('browser-sync').create(),
    notify       = require('gulp-notify'),
    less         = require('gulp-less'),
    sass         = require('gulp-sass'),
    coffee       = require('gulp-coffee'),
    postcss      = require('gulp-postcss'),
    htmlmin      = require('gulp-minify-html'),
    uglify       = require('gulp-uglify'),
    zip          = require('gulp-zip'),
    plumber      = require('gulp-plumber'),
    combine      = require('stream-combiner2').obj,
    uncss        = require('gulp-uncss');

var
    pjs = ['./app/scripts/plugins/jquery.min.js', './app/scripts/plugins/bootstrap.min.js'],
    pcss = ['./app/styles/plugins/bootstrap.min.css'];

var bin = {
    html: './bin/',
    css: './bin/css/',
    js: './bin/js/',
    img: './bin/img/',
    fonts: './bin/fonts/'
};

var project = ts.createProject('tsconfig.json', {typescript: typescript});

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
};

lazyRequireTask('jade', './tasks/jade',
{
    src: './app/templates/**/*.jade',
    jade: { pretty: true },
    dest: bin.html
});

lazyRequireTask('stylus', './tasks/stylus',
{
    src: './app/styles/**/*.styl',
    stylus: { compress: true },
    autoprefixer: { browsers: ['last 2 versions'], cascade: false },
    dest: bin.css
});

lazyRequireTask('less', './tasks/less',
{
    src: './app/styles/**/*.less',
    less: {  },
    autoprefixer: { browsers: ['last 2 versions'], cascade: false },
    dest: bin.css + '/grid/'
});

lazyRequireTask('sass', './tasks/sass',
{
    src: ['./app/styles/**/*.sass','./app/styles/components/header.sass', './app/styles/settings/fonts.sass'],
    sass: {  },
    autoprefixer: { browsers: ['last 2 versions'], cascade: false },
    dest: bin.css
});

lazyRequireTask('typescript', './tasks/typescript',
{
    src: './app/scripts/**/*.{ts,tsx}',
    project: project,
    ts: {  },
    dest: bin.js
});

lazyRequireTask('coffee', './tasks/coffee',
{
    src: './app/scripts/**/*.coffee',
    coffee: { bare: true },
    dest: bin.js
});

lazyRequireTask('babel', './tasks/babel',
{
    src: './app/scripts/**/*.{js,jsx}',
    babel: { presets: ['es2015', 'react'] },
    dest: bin.js
});

lazyRequireTask('images', './tasks/images',
{
    src: './app/images/*.{jpg,png,gif}',
    imgmin: {
        progressive: true,
        optimizationLevel: 7,
        use: [pngquant()]
    },
    dest: bin.img
});

lazyRequireTask('fonts', './tasks/fonts',
{
    src: './app/fonts/**/*',
    dest: bin.fonts
});

lazyRequireTask('plugins', './tasks/plugins',
{
    srcJS: pjs,
    srcCSS: pcss,
    concat: {
        css: 'plugins.css',
        js: 'plugins.js'
    },
    destJS: bin.js,
    destCSS: bin.css,
    mincss: {  }
});

lazyRequireTask('watch', './tasks/watch',
{
    jade: './app/templates/**/*.jade',
    stylus: './app/styles/**/*.styl',
    sass: './app/styles/**/*.sass',
    less: './app/styles/**/*.less',
    coffee: './app/scripts/**/*.coffee',
    typescript: './app/scripts/**/*.{ts.tsx}',
    babel: './app/scripts/**/*.{js,jsx}'
});

lazyRequireTask('server', './tasks/server',
{
    baseDir: './bin/',
    html: bin.html,
    css: bin.css,
    js: bin.js
});

lazyRequireTask('bower', './tasks/bower',
{
    src: {
        jquery: './bower_components/jquery/dist/jquery.min.js',
        bootstrap: {
            css: './bower_components/bootstrap/dist/css/bootstrap.min.css',
            js: './bower_components/bootstrap/dist/js/bootstrap.min.js',
            fonts: './bower_components/bootstrap/dist/fonts/*',
        },
        bourbon: './bower_components/bourbon/app/assets/stylesheets/**/*',
        es5shim: './bower_components/es5-shim/es5-shim.min.js',
        html5shiv: ['./bower_components/html5shiv/dist/html5shiv.min.js', './bower_components/html5shiv/dist/html5shiv-printshiv.min.js'],
        respond: './bower_components/respond/dest/respond.min.js',
    },
    dest: {
        jquery: './app/scripts/plugins/',
        bootstrap: {
            css: './app/styles/plugins/',
            js: './app/scripts/plugins/',
            fonts: './app/fonts/',
        },
        bourbon: './app/styles/plugins/bourbon',
        es5shim: './bin/js/ie/',
        html5shiv: './bin/js/ie/',
        respond: './bin/js/ie/',
    }
});

gulp.task('default', ['compile','server','watch']);

gulp.task('files', ['plugins','images','fonts']);

gulp.task('compile', ['jade','sass','babel']);

gulp.task('production', []);