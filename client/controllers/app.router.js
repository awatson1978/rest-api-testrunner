
Session.setDefault('is_submitting_url', false);

Router.configure({
  layoutTemplate: 'appContainerTemplate'
});

Router.map(function() {
    this.route('home_route', {path: '/', template: 'mochaTestPage'});
    this.route('configuration_route', {path: '/configuration', template: 'configurationPage'});
    this.route('default_route', {path: '*', template: 'mochaTestPage'});
});
