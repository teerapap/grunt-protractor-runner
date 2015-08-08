var exec = require('child_process').execSync,
    runnerStdOut;

exports.testCucumberOpts = function (test) {
    var cmd = 'grunt protractor --cucumberOpts={\\"tags\\":\\"@quick\\"} --verbose',
        testDone = false;

    runnerStdOut = exec(cmd)
    if (typeof runnerStdOut === 'object'){
        runnerStdOut = runnerStdOut.toString();
    }
    if (runnerStdOut.indexOf('Spawn node with arguments:') > -1 && runnerStdOut.indexOf('--cucumberOpts.tags @quick') > -1) {
        test.ok(true, 'CucumberOpts test passed!')
        test.done();
    } else {
        test.ok(false, 'Could not find cucumberOpts')
        test.done();
    }
};

