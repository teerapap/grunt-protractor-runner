describe('Debugger test', function() {
  // getInstance() is removed since protractor v1.5.0
  ptor = (protractor.getInstance)? protractor.getInstance():browser;

  it('should laucnh debugger and verify window.clientSideScripts loaded', function() {
  	ptor.debugger();
    // window.clientSideScripts should be injected on ptor.debugger()
    ptor.executeScript("return (window.clientSideScripts !== undefined)").then(function (result, err){
  	  require("grunt").log.writeln("testing that clientSideScripts exist:" + result);		
  	  expect(result).toEqual(true);
    });
  });
});
