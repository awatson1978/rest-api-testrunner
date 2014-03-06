Session.setDefault('integration_interval', false);
Session.setDefault('username_value', '---');
Session.setDefault('password_value', '---');

Template.configurationPage.events({
  'keyup #usernameInput':function(){
    Session.set('username_value', $('#usernameInput').val());
  },
  'keyup #passwordInput':function(){
    Session.set('password_value', $('#passwordInput').val());
  },

  'click .sample':function(){
    alert($('#iFrameBrowser').contents().find('title').html());
  },

  'click .1-minute':function(){
    Session.set('integration_interval', 1);
    setIntegrationInterval (60);
  },
  'click .5-minute':function(){
    Session.set('integration_interval', 5);
    setIntegrationInterval(300);
  },
  'click .15-minute':function(){
    Session.set('integration_interval', 15);
    setIntegrationInterval(900);
  },
  'click .30-minute':function(){
    Session.set('integration_interval', 30);
    setIntegrationInterval(1800);
  },
  'click .60-minute':function(){
    Session.set('integration_interval', 60);
    setIntegrationInterval(3600);
  },
  'click .240-minute':function(){
    Session.set('integration_interval', 240);
    setIntegrationInterval(14400);
  },
  'click .1440-minute':function(){
    Session.set('integration_interval', 1440);
    setIntegrationInterval(864000);
  }
});
setIntegrationInterval = function(interval) {
  Session.set ('remaining_time_in_seconds', interval);
  setInterval (function () {
    if(Session.get('is_timer_active')){
      if(Session.get('remaining_time_in_seconds') > 0){
        Session.set('remaining_time_in_seconds', Session.get('remaining_time_in_seconds') - 1);
      }else{
        Session.set('remaining_time_in_seconds', interval);
        console.log('time to integrate!');
        alert('Time to run integration tests!  Unfortunately, this feature is only half-implemented, so only pops up this message.');
        Meteor.flush();
      }
    }
  }, 1000);
}



Template.configurationPage.getMinuteStyle1 = function(){
  if(Session.get('integration_interval') === 1) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle5 = function(){
  if(Session.get('integration_interval') === 5) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle15 = function(){
  if(Session.get('integration_interval') === 15) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle30 = function(){
  if(Session.get('integration_interval') === 30) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle60 = function(){
  if(Session.get('integration_interval') === 60) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle240 = function(){
  if(Session.get('integration_interval') === 240) {
    return "selected-item";
  }else{
    return "default-item";
  }
}
Template.configurationPage.getMinuteStyle1440 = function(){
  if(Session.get('integration_interval') === 1440) {
    return "selected-item";
  }else{
    return "default-item";
  }
}

Template.configurationPage.getIntegrationInterval = function(){
  return Session.get('integration_interval');
}
Template.configurationPage.getRemainingTime = function(){
  return Session.get('remaining_time_in_seconds');
}

Session.setDefault('is_timer_active', false);
Template.configurationPage.getTimerButtonText = function(){
  if(Session.get('is_timer_active')){
    return "Stop Integration";
  }else{
    return "Start Automated Integration";
  }
};
Template.configurationPage.isIntegrationActivated = function(){
  if(Session.get('is_timer_active')){
    return true;
  }else{
    return false;
  }
};
Template.configurationPage.events({
  'click .timer-button': function(){
    if(Session.get('is_timer_active')){
      Session.set('integration_interval', 'off');
      Session.set('is_timer_active', false);
    }else{
      Session.set('is_timer_active', true);
    }
  }
})