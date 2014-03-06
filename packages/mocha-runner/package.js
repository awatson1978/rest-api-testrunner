Package.describe({
  summary: "run mocha tests in the browser"
});

Package.on_use(function (api, where) {
  console.log("parsing mocha-runner usage");

  api.use('standard-app-packages');
  api.use(["templating"], ["client"]);

  //always include test report template (it will be just be an empty div if not tests/framework are added)
  api.add_files(["testReport.html"], "client");


  var path = Npm.require("path");
  var fs = Npm.require("fs");
  var util = Npm.require("util");


  api.add_files(["mochastub.js", "chai.js"], ["server"]);
  api.add_files(['mocha.js', "chai.js", "mocha.css", "preTest.js", "testRunner.js"], "client");


  //api.add_files(path.join('../../tests', 'tests.chai.js'));
  api.add_files(path.join('../../tests', 'tests.server.api.js'));
  //api.add_files(path.join('../../tests', 'tests.server.http.js'));
  //api.add_files(path.join('../../tests', 'tests.examples.js'));
  //api.add_files(path.join('../../tests', 'tests.examples.leaderboard.js'));
  //api.add_files(path.join('../../tests', 'tests.examples.todos.js'));
  //api.add_files(path.join('../../tests', 'tests.examples.parties.js'));


;})
