assert = chai.assert;
expect = chai.expect;
should = chai.should();

displayTestAssertion = function(error, result){
  if(result){
    assert.equal(result, "success");
  }else{
    assert.equal(false, true);
  }
  done();
}

describe('Basic API Tests', function(){
  describe('Site Is Alive', function(){
    this.timeout(1000);

    var webpage = null;

    it('checking ' + Session.get('browser_window_location') + ' returns 200 OK...', function(done){
      console.log('checking ' + Session.get('browser_window_location') + ' returns 200 OK...');
      HTTP.call("GET", Session.get('browser_window_location') + '/api/', function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);
        }
        if(error){
          console.error(error);
          assert.equal(error.statusCode, 200);
        }
        done();
      });
    });
  });
});


describe('Campaigns API', function(){



  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  describe('api/', function(){
    this.timeout(3000);

    var newRecordId = 0;

    it('list', function(done){
      console.log('GET ' + Session.get('browser_window_location') + '/api/');

      HTTP.call("GET", Session.get('browser_window_location') + '/api/', function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          assert.ok(result.content);
          console.log(result.content);
        }
        if(error){
          console.error(error);
          assert.equal(error.statusCode, 200);
        }
        done();
      });
    });

    it('insert', function(done){
      console.log('POST ' + Session.get('browser_window_location') + '/api/ + object');

      var newObject = {data: {
        "title" : "test name",
        "text" : "test words foo"
      }};

      HTTP.call("POST", Session.get('browser_window_location') + '/api/', newObject, function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);

          console.log(result.content);
          assert.isNotNull(result.content);
          assert.isDefined(result.content);

          //newRecordId = parsedContent;
        }
        if(error){
          console.error(error);
          assert.equal(error.statusCode, 200);
        }
        done();
      });
    });
    it('get', function(done){
      console.log('GET ' + Session.get('browser_window_location') + '/api/1234567890');

      HTTP.call("GET", Session.get('browser_window_location') + '/api/' + newRecordId, function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          assert.ok(result.content);

          console.log(result.content);
          assert.isNotNull(result.content);
          assert.isDefined(result.content);
        }
        if(error){
          console.error(error);
          assert.equal(error.statusCode, 200);
        }
        done();
      });
    });
    it('update', function(done){
      console.log('PUT ' + Session.get('browser_window_location') + '/api/1234567890 + object');

      var updatedObject = {
        "name" : "updated name"
      }

      HTTP.call("PUT", Session.get('browser_window_location') + '/api/' + newRecordId, {data: updatedObject}, function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);
          assert.equal(result.content, 'Success');
        }
        if(error){
          assert.isTrue(false);
        }
        done();
      });
    });

    it('delete', function(done){
      console.log('DELETE ' + Session.get('browser_window_location') + '/api/1234567890');

      HTTP.call("DELETE", Session.get('browser_window_location') + '/api/'  + newRecordId, function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);

          console.log(result.content);
          assert.isNotNull(result.content);
          assert.isDefined(result.content);
        }
        if(error){
          console.error(error);
          assert.equal(error.statusCode, 200);
        }
        done();
      });
    });
  });
});
