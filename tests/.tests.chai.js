assert = chai.assert;
expect = chai.expect;
should = chai.should();

var foo = 'bar';
var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };


describe('Chai.js Unit Tests', function(){
  describe('lets confirm some chai assertions  work!  :)', function(){
    it('assert.typeOf', function(done){
      assert.typeOf(foo, 'string', 'foo is a string');
      done();
    });
    it('assert.equal with objects', function(done){
      assert.equal(foo, 'bar', 'foo equal `bar`');
      done();
    });
    it('assert.lengthOf object', function(done){
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
      done();
    });
    it('assert.lengthOf array', function(done){
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
      done();
    });
  });

  describe('what about some chai expectations?', function(){
    it('expect(foo).to.be.a(string)', function(done){
      expect(foo).to.be.a('string');
      done();
    });
    it('expect(foo).to.equal(bar)', function(done){
      expect(foo).to.equal('bar');
      done();
    });
    it('expect(foo).to.have.length(3)', function(done){
      expect(foo).to.have.length(3);
      done();
    });
    it('expect(beverages).to.have.property(tea).with.length(3)', function(done){
      expect(beverages).to.have.property('tea').with.length(3);
      done();
    });
  });
  describe('what about some chai should tests?', function(){
    it('foo.should.be.a(string)', function(done){
      foo.should.be.a('string');
      done();
    });
    it('foo.should.equal(bar);', function(done){
      foo.should.equal('bar');
      done();
    });
    it('foo.should.have.length(3);', function(done){
      foo.should.have.length(3);
      done();
    });
    it('beverages.should.have.property(tea).with.length(3);', function(done){
      beverages.should.have.property('tea').with.length(3);
      done();
    });
  });
});