'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('test_e2e', function () {
        return gulp.src(['test/e2e/**/*.js'])
            .pipe(mocha({
                timeout: 6000,
                'check-leaks': true,
                ui: 'bdd'
            }));
    });
};
