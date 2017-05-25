'use strict';

let gulp     = require('gulp'),
    plugins  = require('gulp-load-plugins')(),
    taskPath = './tasks/',
    // async readdir does not identify task names
    taskList = require('fs').readdirSync(taskPath);

taskList.forEach(function (taskFile) {
    // or .call(gulp,...) to run this.task('foobar')...
    require(taskPath + taskFile)(gulp, plugins);
});
