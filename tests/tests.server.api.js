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
    it('checking ' + Session.get('browser_window_location') + ' is alive...', function(done){
      Meteor.call('openWebPage', Session.get('browser_window_location'), function (error, result){
        if(result){
          assert.equal(result, "success");
        }else{
          assert.equal(false, true);
        }
        done();
      });
    });

    it('checking ' + Session.get('browser_window_location') + ' returns 200 OK...', function(done){
      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);
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
    this.timeout(2000);

    var newRecordId = 0;

    it('list', function(done){
      HTTP.call("GET", Session.get('browser_window_location') + '/api/', function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          var parsedContent = JSON.parse(result.content);

          assert.ok(parsedContent);
          console.log(parsedContent);
        }
        done();
      });
    });

    it('insert', function(done){
      console.count('testing Campaigns:Insert');

      var newObject = {
        "name" : "test name",
        "description" : "test description",
        "client_id" : "987654321",
        "start_date" : new Date(moment("2014-01-01").unix()),
        "end_date" : new Date(moment("2014-01-07").unix()),
        "timestamp" : new Date()
      }

      HTTP.call("POST", Session.get('browser_window_location') + '/api/', {data: newObject}, function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');

          var parsedContent = JSON.parse(result.content);
          console.log(parsedContent);
          assert.isNotNull(parsedContent);
          assert.isDefined(parsedContent);

          newRecordId = parsedContent;
        }
        done();
      });
    });
    it('get', function(done){
      HTTP.call("GET", Session.get('browser_window_location') + '/api/' + newRecordId, function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          assert.ok(result.content);
        }
        done();
      });
    });
    it('update', function(done){
      console.count('testing Campaigns:Update');

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
      HTTP.call("DELETE", Session.get('browser_window_location') + '/api/'  + newRecordId, function(error, result){
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
