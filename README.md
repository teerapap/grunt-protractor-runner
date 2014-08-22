# grunt-protractor-runner

> A Grunt plugin for running [Protractor](https://github.com/angular/protractor) runner.

## Getting Started
This plugin requires Grunt `~0.4.1` and Protractor `1.x.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-protractor-runner --save-dev
```

This plugin will install `protractor` module locally as a normal dependency.
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-protractor-runner');
```

If you want to use standalone selenium server, run `./node_modules/protractor/bin/webdriver-manager update` to install/update the selenium server for local installed protractor.

## The "protractor" task

### Overview
In your project's Gruntfile, add a section named `protractor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  protractor: {
    options: {
      configFile: "node_modules/protractor/referenceConf.js", // Default config file
      keepAlive: true, // If false, the grunt process stops when the test fails.
      noColor: false, // If true, protractor will not use colors in its output.
      args: {
        // Arguments passed to the command
      }
    },
    your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
      options: {
        configFile: "e2e.conf.js", // Target-specific config file
        args: {} // Target-specific arguments
      }
    },
  },
})
```

### Options

#### options.configFile
Type: `String`
Default value: `node_modules/protractor/referenceConf.js` relative to where protractor module is installed.

A protractor config file.

#### options.keepAlive
Type: `Boolean`
Default value: `false` (`true` before v1.0.0)

If true, grunt process continues even if the test fails. This option is useful when using with grunt watch.
If false, grunt process stops when the test fails.

#### options.noColor
Type: `Boolean`
Default value: `false`

If true, protractor will not give colored output.
If false, protractor will give colored output, as it does by default.

#### options.debug
Type: `Boolean`
Default value: `false`

If true, grunt will pass 'debug' as second argument to protractor CLI to enable node CLI debugging as described in [Protractor Debugging documentation](https://github.com/angular/protractor/blob/master/docs/debugging.md).

#### options.args
Type: `Object`
Default value: `{}`

Arguments passed to the command. These arguments can also be supplied via command-line too. Ex.`grunt protractor --specs=specs/some-test.js`
Supported arguments are below.

* seleniumAddress `string`: A running selenium address to use
* seleniumServerJar `string`: Location of the standalone selenium server .jar file
* seleniumPort `string`: Optional port for the standalone selenium server
* baseUrl `string`: URL to prepend to all relative paths
* rootElement `string`: Element housing ng-app, if not html or body
* specs `array`: Array of spec files to test. Ex. `["spec1.js","spec2.js"]`
* exclude `array`: Array of files to exclude from testing. Ex. `["spec2.js"]`
* suite `string`: Name of test suite to run
* includeStackTrace `boolean`: Print stack trace on error
* verbose `boolean`: Print full spec names
* browser `string`: Browser name, e.g. chrome or firefox
* params `object`: Param object to be passed to the test as browser.params
* chromeDriver `string`: Location of chrome driver overridng the property in config file
* chromeOnly `boolean`: Bypass Selenium for Chrome only testing
* sauceUser `string`: Username for a SauceLabs account
* sauceKey `string`: Access Key for a SauceLabs account
* capabilities `object`: Capabilities object to be passed to the test, e.g. browserName, platform and version
* framework `string`: Limited support for using mocha as the test framework instead of jasmine.
* cucumberOpts `object`: Cucumber framework options object to be passed to the test, e.g. require, tags and format
* mochaOpts `object`: Mocha test framework options object to be passed

## Tests

Run `npm install` to install dependencies.

Then run `grunt` or `npm test` to test the module. You will encounter these.

* It opens chrome a couple of times without warnings or errors.
* A test task fails but the test process keeps alive and continues to the next test tasks.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## FAQ

### Q: Want to global installed protractor?

This plugin installs `protractor` module locally as a normal dependency.

In case you want to use the plugin with the global installed protractor command. You can do it with these steps below.

* Remove local install protractor by `rm -rf node_modules/protractor`
* Install `protractor` globally  with `npm install -g protractor`
* Make sure that node can resolve the module with `require()` mechanism. See [Module loading from the global folders](http://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) for more information.
* Run `webdriver-manager update` to install/update selenium driver for global install protractor.

### Q: Error: Could not find chromedriver at....

You need to install/update selenium webdriver for protractor.

* Run `webdriver-manager update` or `node scripts/webdriver-manager-update`

## Release History

* 1.1.4
  * Move `webdriver-manager update` step from problematic postinstall to pretest
* 1.1.3
  * Attempt to fix webdriver-manager postinstall problem with webdriver-manager script (#83)
* 1.1.2
  * Attempt to fix webdriver-manager path in package.json postinstall
  * Add Travis CI build configuration
* 1.1.1
  * Run webdriver-manager update on postinstall (#41)
* 1.1.0
  * Update protractor to version 1.x.x
* 1.0.1
  * Pass specified command line params to the subprocess (#68)
  * Make npm test to run and handle interactive debugger by itself (#66)
  * Fixed argsTest
* 1.0.0
  * Change default value of `options.keepAlive` to false (#50)

* 0.2.5
  * Support --mochaOpts, --suite and --exclude in options.args (#52, #53, #57)
* 0.2.4
  * Support --cucumberOpts in options.args (#46)
* 0.2.3
  * Temporarily remove automatically download/update webdriver-manager because it fails in some environment such as Windows (#41)
* 0.2.2
  * Add `protractor` module as a normal dependency and automatically download/update webdriver with `webdriver-manager` after installed (#29, #39)
  * Support --framework in options.args (#36)
* 0.2.1
  * Support --capabilities in options.args (#33)
* 0.2.0
  * Able to use either local or global install protractor the same way as how `require()` function works (#29)
  * Move protractor from `peerDependencies` to `devDependencies`. These changes might break some user modules. (See FAQ above for explanation) (#29)
* 0.1.11 - Support SauceLabs account config in options.args (#27)
* 0.1.10
  * Support --chromeOnly in options.args (#23)
  * Support options.noColor to turn color off in protractor output (#24)
* 0.1.9
  * Able to supply options.args via command-line arguments (#20)
  * Fixed merging task-level and target-level options
* 0.1.8 - Support --chromeDriver in options.args (#17)
* 0.1.7 - Support --browser and --params arguments passed to the protractor command using config in options.args (#12)
* 0.1.6 - Change protractor(peerDependencies) to support version to 0.x (#8, #9, #10)
* 0.1.5 - Added `options.debug` (#7)
* 0.1.4 - Change protractor(peerDependencies) to support version to 0.10.x - 0.11.x (#6)
* 0.1.3 - Fixed Windows command
* 0.1.2 - Added keepAlive option.
