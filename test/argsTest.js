



describe('Argument test', function() {

  it('browser.params should have value.', function() {
    var p = { // Same as in Gruntfile.js except nil property.
              number: 1,
              bool: true,
              str: "string",
              obj: {
                array: [1, 2, 3],
                undef: undefined
              }
            };
    expect(browser.params).toEqual(p);
  });
});
