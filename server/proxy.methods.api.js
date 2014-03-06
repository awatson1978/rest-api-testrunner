Meteor.methods({
  openWebPage: function (websiteUrl) {
    try{
      this.unblock();

      var result = Meteor.http.call("GET", websiteUrl);
      if (result.statusCode === 200){
        return "success";
      }else{
        return 'failure';
      }
    }catch(error){
      console.log('openWebPage Error');
      console.log(error);
    }
  },
  confirmApiResponds: function (websiteUrl) {
    try{
      this.unblock();
      console.log('testApi: ' + websiteUrl);
      var result = Meteor.http.call("GET", websiteUrl);
      if (result.statusCode === 200){
        return "success";
      }else{
        return 'failure';
      }
    }catch(error){
      console.log('confirmApiResponds Error');
      console.log(error);
    }
  }
});