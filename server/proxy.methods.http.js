
var Future = Npm.require("fibers/future");
request = Npm.require("request");

Meteor.methods({
  pingTest: function (options) {
    try{
      return "pong";
    }catch(error){
      console.log(error);
    }
  },
  pingTestWithObject: function (payload) {
    try{
      if(payload){
        return "received!";
      }else{
        return "no object, boo...";
      }
    }catch(error){
      console.log(error);
    }
  },
  pingTestReturnsObject: function (options) {
    try{
      var beverages = { cider: [ 'apple', 'pear', 'stout' ] };
      return beverages;
    }catch(error){
      console.log(error);
    }
  },
  pingTestObjectRoundTrip: function (payload) {
    try{
      var beverages = { cider: [ 'apple', 'pear', 'stout' ] };
      payload.cider = beverages.cider;
      return payload;
    }catch(error){
      console.log(error);
    }
  },
  requestSimpleWebPage: function (options) {
    try{
      var future = new Future();
      var resolver = future.resolver();
      var result = "";
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          result = body;
          future.return(result);
        }
      });
      future.wait();
      return result;
    }catch(error){
      console.log(error);
    }
  }
});






