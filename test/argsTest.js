



describe('Argument test', function() {

  it('browser.params should have value.', function() {
    var p = { // Same as in Gruntfile.js except nil property.
              number: 1,
              bool_true: true,
              bool_false: false,
              str: "string",
              obj: {
                array: [1, 2, 3],
              }
            };

    expect(browser.params).toEqual(p);
  });

  it('capabilities should have value.', function() {
    var browserName = "chrome"; //Same as in Gruntfile.js.
    browser.getCapabilities().then(function(browserName) {
      expect(browserName).toEqual(browserName);
    });
  });  
});
