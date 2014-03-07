Session.setDefault('safety_harness_title', "API Test Runner")
Session.setDefault('demo_mode', true);

Template.navbarHeaderTemplate.getTitle = function(){
  return Session.get('safety_harness_title');
};

Template.navbarHeaderTemplate.getLink = function(){
    if(Session.get('demo_mode')){
        return '/';
    }else{
        return '/tests';
    }
};

//Template.navbarHeaderTemplate.events({
//  'keyup #urlAddressBar': function(evt,tmpl){
//    try{
//      if(evt.keyCode == 13) {
//        Session.set('browser_window_location', $('#urlAddressBar').val());
//        Meteor.flush();
//      }
//    }catch(err){
//      console.error(err);
//    }
//  }
//});
Template.navbarFooterTemplate.getUrl = function(){
  return Session.get('browser_window_location');
};

Template.navbarFooterTemplate.getPasswordValue = function(){
  if(Session.get('password_value')){
    return ':' + Session.get('password_value');
  }else{
    return "";
  }
}
Template.navbarFooterTemplate.getUsernameValue = function(){
  if(Session.get('username_value')){
    return Session.get('username_value') + "@";
  }else{
    return "";
  }
}

