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

describe('ThinAire API Tests', function(){
  describe('Site Is Alive', function(){
    this.timeout(1000);

    var webpage = null;
    it('checking thinaire.net is alive...', function(done){
      Meteor.call('openWebPage', Session.get('browser_window_location'), function (error, result){
        if(result){
          assert.equal(result, "success");
        }else{
          assert.equal(false, true);
        }
        done();
      });
    });

    it('checking thinaire.net returns 200 OK...', function(done){
      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
        if(result){
          assert.equal(result.statusCode, 200);
        }
        done();
      });
    });
    it('confirming were on version 1.3.3', function(done){
      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
        if(result){
          assert.equal(result.content, 'Thinaire API Service - version 1.3.3');
        }
        done();
      });
    });

  });
});


describe('Campaigns API', function(){
//  describe('Confirm ~/v1/campaigns/ exists', function(){
//    it('returns a 200', function(done){
//      HTTP.call("GET", Session.get('browser_window_location') + '/v1/campaigns/', function(error, result){
//        if(result){
//          assert.equal(result.statusCode, '200');
//          //console.log(JSON.stringify(result));
//        }
//        done();
//      });
//    });
//  });
//  it('verify document object schema', function(done){
//    HTTP.call("GET", Session.get('browser_window_location') + '/v1/campaigns/', function(error, result){
//      if(result){
//        assert.equal(result.statusCode, '200');
//
//        var parsedContent = JSON.parse(result.content);
//        console.log(parsedContent);
//
//        assert.ok(parsedContent);
//        assert.notEqual(parsedContent.length, 0);
//
//
//        var firstObject = parsedContent[0];
//        assert.ok(firstObject._id);
//        assert.ok(firstObject.name);
//        assert.ok(firstObject.description);
//        assert.ok(firstObject.client_id);
//        assert.ok(firstObject.start_date);
//        assert.ok(firstObject.end_date);
//        assert.ok(firstObject.timestamp);
//
//      }
//      done();
//    });
//  });



  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  describe('~/v1/campaigns/', function(){
    this.timeout(2000);

    var newRecordId = 0;

    it('list', function(done){
      HTTP.call("GET", Session.get('browser_window_location') + '/v1/campaigns/', function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          var parsedContent = JSON.parse(result.content);

          assert.ok(parsedContent);
          console.log(parsedContent);
          assert.equal(parsedContent.length, 10);

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

      HTTP.call("POST", Session.get('browser_window_location') + '/v1/campaigns/', {data: newObject}, function(error, result){
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
      HTTP.call("GET", Session.get('browser_window_location') + '/v1/campaigns/' + newRecordId, function(error, result){
        if(result){
          assert.equal(result.statusCode, '200');
          assert.ok(result.content);

          var parsedContent = JSON.parse(result.content);
          //console.log(parsedContent);

          assert.ok(parsedContent._id);
          assert.ok(parsedContent.name);
          assert.ok(parsedContent.description);
          assert.ok(parsedContent.client_id);
          assert.ok(parsedContent.start_date);
          assert.ok(parsedContent.end_date);
          assert.ok(parsedContent.timestamp);

          assert.equal(parsedContent._id, newRecordId);
          assert.equal(parsedContent.name, "test name");
        }
        done();
      });
    });
    it('update', function(done){
      console.count('testing Campaigns:Update');

      var updatedObject = {
        "name" : "updated name"
      }

      HTTP.call("PUT", Session.get('browser_window_location') + '/v1/campaigns/' + newRecordId, {data: updatedObject}, function(error, result){
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
      HTTP.call("DELETE", Session.get('browser_window_location') + '/v1/campaigns/'  + newRecordId, function(error, result){
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

//describe('Clients API', function(){
//  describe(Session.get('browser_window_location') + '/v1/clients/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//
//describe('Content API', function(){
//  describe(Session.get('browser_window_location') + '/v1/content/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Creatives API', function(){
//  describe(Session.get('browser_window_location') + '/v1/creatives/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Experiences API', function(){
//  describe(Session.get('browser_window_location') + '/v1/experiences/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Interactions API', function(){
//  describe(Session.get('browser_window_location') + '/v1/interactions/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Onramps API', function(){
//  describe(Session.get('browser_window_location') + '/v1/onramps/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Products API', function(){
//  describe(Session.get('browser_window_location') + '/v1/products/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Reports API', function(){
//  describe(Session.get('browser_window_location') + '/v1/reports/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Statistics API', function(){
//  describe(Session.get('browser_window_location') + '/v1/statistics/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Stores API', function(){
//  describe(Session.get('browser_window_location') + '/v1/stores/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});
//
//describe('Visitors API', function(){
//  describe(Session.get('browser_window_location') + '/v1/visitors/', function(){
//    this.timeout(1000);
//
//    it('list', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('insert', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('get', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//    it('delete', function(done){
//      HTTP.call("GET", Session.get('browser_window_location'), function(error, result){
//        if(result){
//          assert.equal(result.content, 'foo');
//        }
//        done();
//      });
//    });
//  });
//});

