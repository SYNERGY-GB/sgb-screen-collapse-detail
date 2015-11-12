'use strict';

var gulp = require('gulp');

gulp.task('assets:serve', function () {
   return gulp.src('assets/**/*.*')
       .pipe(gulp.dest('.tmp/assets'));
});

gulp.task('assets:dist', function () {
    //TODO: Add imagemin
    return gulp.src('assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
});