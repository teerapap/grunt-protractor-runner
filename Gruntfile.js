/*
 * grunt-protractor-runner
 * https://github.com/teerapap/grunt-protractor-runner
 *
 * Copyright (c) 2013 Teerapap Changwichukarn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    protractor: {
      options: {
        keepAlive: false
      },
      testTargetConfigFile: {
        configFile:"test/testConf.js",
      },
      testKeepAliveOnFailedTest: {
        configFile:"test/testConf.js",
        options: {
          keepAlive: true,
          args: {
            specs:["test/failedTest.js"],
          }
        }
      },
      testArgs: {
        configFile:"test/testConf.js",
        options: {
          args: {
            params: {
              number: 1,
              bool: true,
              str: "string",
              nil: null, // Null is not supported.
              obj: {
                array: [1, 2, 3],
                undef: undefined
              }
            },
            capabilities: {
              'browserName': 'chrome'
            },
            rootElement:"body",
            specs:["test/argsTest.js"],
            verbose:true
          }
        }
      },
      testDebug: {
        configFile:"test/testConf.js",
        options: {
          debug:true,
          args: {
            specs:["test/debugTest.js"],
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'protractor']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
