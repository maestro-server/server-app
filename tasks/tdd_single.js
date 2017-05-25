'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('tdd_single', function() {

        return gulp.watch('test/**/*.js')
            .on('change', function(file) {
                gulp.src(file.path)
                    .pipe(mocha({
                        timeout: 6000,
                        'check-leaks': true,
                        ui: 'bdd',
                        reporter: 'tap' //spec, tap
                    }));
            });

    })
};
