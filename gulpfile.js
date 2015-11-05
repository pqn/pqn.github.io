var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');

gulp.task('default', function () {
  gulp.start(['sass', 'uglify']);
});

gulp.task('watch', function () {
  gulp.start('default');
  gulp.start(['sass:watch', 'uglify:watch']);
});

gulp.task('sass', function () {
  gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./*.scss', ['sass']);
});

gulp.task('uglify', function () {
  gulp.src([
    "./bower_components/jquery/dist/jquery.min.js",
    "./bower_components/highlightjs/highlight.pack.min.js",
    "./bower_components/scrollReveal.js/dist/scrollReveal.min.js",
    "./bower_components/filament-sticky/fixedsticky.js",
    "./bower_components/tinycolor/dist/tinycolor-min.js",
    "./not_bower/*.js",
    "./custom.js"
  ])
    .pipe(concat('custom.min.js'))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('.'));
});

gulp.task('uglify:watch', function () {
  gulp.watch('./custom.js', ['uglify']);
});