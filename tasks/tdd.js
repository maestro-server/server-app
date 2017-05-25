'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('tdd', function() {
        return gulp.watch(['app/**/*.js','test/**/*.js'], ['test']);
    })
};
