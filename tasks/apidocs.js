'use strict';

let gulp = require('gulp'),
    apidoc = require('gulp-apidoc'),
    minimist = require('minimist'),
    knownOptions = {string: 'name'};

let options = minimist(process.argv.slice(2), knownOptions);

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('apidocs', function (done) {
      apidoc({
            src: "app/" + options.name,
            dest: "apidocs/" + options.name,
            config: "./"
          }, done);
    });
};
