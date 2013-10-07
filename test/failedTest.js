


describe('Failed test', function() {
  ptor = protractor.getInstance();

  it('should failed', function() {
    expect(1).toEqual(0);
  });
});
