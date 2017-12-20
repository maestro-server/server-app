'use strict';

let gulp = require('gulp'),
    apidoc = require('gulp-apidoc');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('apidocs', function (done) {
      apidoc({
            src: "app/",
            dest: "apidocs/",
            config: "./"
          }, done);
    });
};
