


describe('Failed test', function() {
  // getInstance() is removed since protractor v1.5.0
  ptor = (protractor.getInstance)? protractor.getInstance():browser;

  it('should failed', function() {
    expect(1).toEqual(0);
  });
});
