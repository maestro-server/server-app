'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {

    gulp.task('test_integration', function () {
        return gulp.src(['test/integration/**/*.js'])
            .pipe(mocha({
                timeout: 6000,
                'check-leaks': true,
                ui: 'bdd',
                reporter: 'nyan'
            }));
    });
};
