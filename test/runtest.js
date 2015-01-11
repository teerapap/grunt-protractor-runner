

var nexpect = require('nexpect');

nexpect.spawn("grunt", ["test"], { stripColors: true, verbose:true })
       .wait(/  [0-9]*   var list = this;/)
       .wait("debug> ")
       .sendline("c")
       .wait(/ [0-9]* };/)
       .wait("debug> ")
       .sendline("c")
       .run(function (err, o, code) {
          if (err) {
            console.log(err)
            process.exit(1);
            return;
          }
          process.exit(code);
       });
