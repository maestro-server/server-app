'use strict';

let gulp = require('gulp'),
    eslint = require('gulp-eslint');


module.exports = function (gulp, $) {

    gulp.task('eslint', function () {
        return gulp.src(['**/*.js','!node_modules/**'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
};
