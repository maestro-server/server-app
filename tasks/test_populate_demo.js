'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('test_populate_demo', function () {
        return gulp.src(['devtools/migration_demo/populate.js'])
            .pipe(mocha({
                timeout: 6000,
		exit: true
            }));
    });
};
