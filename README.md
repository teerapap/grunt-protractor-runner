# grunt-protractor-runner

> A Grunt plugin for running [Protractor](https://github.com/angular/protractor) runner.

## Getting Started
This plugin requires Grunt `~0.4.1` and Protractor `>=0.10.0-0 <1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-protractor-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-protractor-runner');
```

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
    your_target: {
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
Default value: `true`

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
* includeStackTrace `boolean`: Print stack trace on error
* verbose `boolean`: Print full spec names
* browser `string`: Browser name, e.g. chrome or firefox
* params `object`: Param object to be passed to the test as browser.params
* chromeDriver `string`: Location of chrome driver overridng the property in config file
* chromeOnly `boolean`: Bypass Selenium for Chrome only testing
* sauceUser `string`: Username for a SauceLabs account
* sauceKey `string`: Access Key for a SauceLabs account

## Tests

Run `npm install` to install dependencies. It will install protractor locally just for testing even though you have installed it globally.
Run `./node_modules/protractor/bin/webdriver-manager update` to install and update the selenium driver locally.

In case you want to test the plugin with the global installed protractor command.

* Remove local install protractor by `rm -rf node_modules/protractor`
* Run `webdriver-manager update` to install/update selenium driver for global install protractor.

Then run `grunt` or `npm test` to test the module. You will encounter these.

* It opens chrome a couple of times without warnings or errors.
* A test task fails but the test process keeps alive and continues to the next test tasks.
* It will launch the node debugger. You'll need to enter c a few times to progress through a few breakpoints, and then when it succeed, press Ctrl-c 2 times to exit the debugger to continue other test tasks.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## FAQ

### Q: Use local or global protractor?

Now the plugin uses local or global installed protractor the same way as how `require()` function chooses.

### Q: No longer peerDependencies?

It is no longer peerDependencies because protractor is officially suggested to be installed globally with `npm install -g`. Specifying it as peerDependencies will get npm to install it locally so the global installed one is not used by this plugin even though it exists. If user wants to use local protractor, specifies it as dependencies in user's package.json so it gets installed locally and used by this plugin.

It is devDependencies because it is needed to test the plugin itself. The version for devDependencies is at least 0.14.0 because `testConf.js` needs to change due to new webdriver-manager script in protractor v0.14.0

## Release History

* 0.2.0
  * Able to use either local or global install protractor the same way as how `require()` function works
  * Move protractor from peerDependencies to devDependencies. These changes might break some user modules. (See FAQ above for explanation)
* 0.1.11 - Support SauceLabs account config in options.args
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
