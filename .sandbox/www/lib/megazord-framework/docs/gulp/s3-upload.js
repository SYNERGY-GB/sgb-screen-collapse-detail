'use strict';

var gulp = require('gulp');
var s3 = require('gulp-s3-upload')({});
var bucket = process.env.S3_BUCKET || 'megazord-framework';

gulp.task('s3:upload', ['docs:build'], function () {
    return gulp.src('dist/**')
        .pipe(s3({
            Bucket: bucket,
            ACL: 'public-read',
            keyTransform: function(name) {
                return 'docs/' + name;
            }
        }));
});