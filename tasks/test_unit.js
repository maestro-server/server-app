'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('test_unit', function () {
        return gulp.src(['test/unit/**/*.js'])
            .pipe(mocha({
                timeout: 6000,
                'check-leaks': true,
                ui: 'bdd',
                reporter: 'nyan'
            }));
    });
};
