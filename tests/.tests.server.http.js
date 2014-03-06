assert = chai.assert;
expect = chai.expect;
should = chai.should();

var foo = 'bar';
var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };



var serverResult = false;
describe('Server Unit Tests', function(){

  describe('lets try communicating with the server...  ', function(){
    it('lets ping the server and see if we get a response...', function(done){
      Meteor.call('pingTest', function (error, result){
        assert.equal('pong', result);
        done();
      });
    });
    it('lets ping the server with an object...', function(done){
      Meteor.call('pingTestWithObject', beverages, function (error, result){
        assert.equal('received!', result);
        done();
      });
    });
    it('lets ping the server and see if it can return an object...', function(done){
      Meteor.call('pingTestReturnsObject', function (error, result){
        result.should.have.property('cider').with.length(3);
        done();
      });
    });
    it('lets try the round trip...', function(done){
      Meteor.call('pingTestObjectRoundTrip', beverages, function (error, result){
        result.should.have.property('cider').with.length(3);
        result.should.have.property('tea').with.length(3);
        done();
      });
    });
    it('lets check if the server can do a proxy HTTP request...', function(done){
      console.log('lets check if the server can do a proxy HTTP request...');
      Meteor.call('requestSimpleWebPage', 'http://todos.meteor.com', function (error, result){
        console.log('calling requestSimpleWebPage');
        //result.should.exist;
        if(result){
          console.log(result)
          assert.equal(true, true);
        }else{
          assert.equal(false, true);
        }
        done();
      });
    });
  });
});




