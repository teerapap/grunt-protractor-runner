/*
 * grunt-protractor-runner
 * https://github.com/teerapap/grunt-protractor-runner
 *
 * Copyright (c) 2013 Teerapap Changwichukarn
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('protractor', 'A grunt task to run protractor.', function() {

    // '.../node_modules/protractor/lib/protractor.js'
    var protractorMainPath = require.resolve('protractor');
    // '.../node_modules/protractor/bin/protractor'
    var protractorBinPath = path.resolve(protractorMainPath, '../../bin/protractor');
    // '.../node_modules/protractor/referenceConf.js'
    var protractorRefConfPath = path.resolve(protractorMainPath, '../../referenceConf.js');

    // Merge task-specific and/or target-specific options with these defaults.
    var opts = this.options({
      configFile: protractorRefConfPath,
      keepAlive: true,
      noColor: false,
      debug: false,
      args: {}
    });

    // configFile is a special property which need not to be in options{} object.
    if (!grunt.util._.isUndefined(this.data.configFile)) {
      opts.configFile = this.data.configFile;
    }

    grunt.verbose.writeln("Options: " + util.inspect(opts));

    var keepAlive = opts['keepAlive'];
    var strArgs = ["seleniumAddress", "seleniumServerJar", "seleniumPort", "baseUrl", "rootElement", "browser", "chromeDriver", "chromeOnly", "sauceUser", "sauceKey", "framework", "suite"];
    var listArgs = ["specs", "exclude"];
    var boolArgs = ["includeStackTrace", "verbose"];
    var objectArgs = ["params", "capabilities", "cucumberOpts", "mochaOpts"];

    var args = [protractorBinPath, opts.configFile];
    if (opts.noColor){
      args.push('--no-jasmineNodeOpts.showColors');
    }
    if (!grunt.util._.isUndefined(opts.debug) && opts.debug === true){
      args.splice(1,0,'debug');
    }

    // Iterate over all supported arguments.
    strArgs.forEach(function(a) {
      if (a in opts.args || grunt.option(a)) {
        args.push('--'+a, grunt.option(a) || opts.args[a]);
      }
    });
    listArgs.forEach(function(a) {
      if (a in opts.args || grunt.option(a)) {
        args.push('--'+a,  grunt.option(a) || opts.args[a].join(","));
      }
    });
    boolArgs.forEach(function(a) {
      if (a in opts.args || grunt.option(a)) {
        args.push('--'+a);
      }
    });

    // Convert [object] to --[object].key1 val1 --[object].key2 val2 ....
    objectArgs.forEach(function(a) {
      (function convert(prefix, obj, args) {
        for (var key in obj) {
          var val = obj[key];
          var type = typeof obj[key];
          if (type === "object") {
            if (Array.isArray(val)) {
              // Add duplicates --[object].key val1 --[object].key val2 ...
              for (var i=0;i<val.length;i++) {
                args.push(prefix+"."+key, val[i]);
              }
            } else {
              // Dig deeper
              convert(prefix+"."+key, val, args);
            }
          } else if (type === "undefined" || type === "function") {
            // Skip these types
          } else if (type === "boolean") {
            // Add --[object].key
            args.push(prefix+"."+key);
          } else {
            // Add --[object].key value
            args.push(prefix+"."+key, val);
          }
        }
      })("--" + a, opts.args[a], args);
    });

    grunt.verbose.writeln("Spawn node with arguments: " + args.join(" "));

    // Spawn protractor command
    var done = this.async();
    grunt.util.spawn({
        cmd: 'node',
        args: args,
        opts: {
          stdio:'inherit'
        }
      },
      function(error, result, code) {
        if (error) {
          grunt.log.error(String(result));
          if(code === 1 && keepAlive) {
            // Test fails but do not want to stop the grunt process.
            grunt.log.oklns("Test failed but keep the grunt process alive.");
            done();
            done = null;
          } else {
            // Test fails and want to stop the grunt process,
            // or protractor exited with other reason.
            grunt.fail.fatal('protractor exited with code: '+code, 3);
          }
        } else {
          done();
          done = null;
        }
      }
    );
  });

};
