'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');

gulp.task('sass', function () {
  return gulp.src('./assets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('sassdoc', function () {
  return gulp.src('./assets/loom/**/*.scss')
    .pipe(sassdoc({
      dest: 'public/docs'
    }));
});

gulp.task('watch', function() {
  gulp.watch('./assets/loom/**/*.scss', ['sass', 'sassdoc']);
});

gulp.task('default', ['watch']);
