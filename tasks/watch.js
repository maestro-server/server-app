'use strict';


module.exports = function mochacli(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Options
    return {
      scripts: {
        files: ['Gruntfile.js', 'app/**/*.js', 'tests/**/*.js'],
        tasks: ['test']
      }
    };
};
