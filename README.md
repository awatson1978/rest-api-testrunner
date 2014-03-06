### Api TestRunner

**api-testrunner** is a REST API test runner built using Meteor.  The only thing it's designed for is testing REST endpoints.  

### Continuous Integration

Continous integration is currently set to run on page load, code hot-reload, and on file-save.  That means the continous integration currently is event-driven.  There are new controls at the bottom of the application that allow you to set an integration interval.  This feature is only half-implemented.  The interval control works just fine.  It's just that the test runner hasn't been abstracted so that it has an API hook to call at the interval.  So, in the meantime, I just put an alert.  Bottom line.... the continuous integration buttons don't do anything except create a timer that counts down and displays a popup alert.  And the test-runner is still tied to the page onload event.  (But the test will run on LiveEdit, so it totally works for continous integtation, if you want.)


### Basic Installation

**Get Your App Running**  
1. Run the app you're building locally with ``sudo mrt``  
2. Or maybe deploy it using ``sudo mrt deploy my-todo-example.meteor.com``.   


**Get Safety-Harness Running**  
3.  Clone the safety-harness repository.  
4.  Run safety-harness locally with ``sudo mrt``  
5.  Or run it on a separate port using ``sudo mrt -p 3200``  
6.  Deploy your updated app again (now with access control headers!) using ``sudo mrt deploy my-todo-example.meteor.com``  
7.  Or maybe to Modulus again with another ``sudo demeteorizer; cd .demoeteorized; sudo modulus deploy``. Note:  you will need to deploy Safety-Harness to a separate project and domain name.

**Configure Safety-Harness**  
8.  Maybe update the ``browser_window_location`` in the file ``main.js``?  


**Review Existing Tests**  
9.  Once all that's set up, check out the following files, which should have everything you need to get started.
````js
// server side proxy functions
server/proxy.methods.api.js
server/proxy.methods.http.js

// client side tests
tests/tests.server.api.js
tests/tests.server.http.js
tests/tests.chai.http.js
````

**Write Some Tests**  
13.  Start writing tests by editing a file like ``tests\tests.examples.todos.js``.  
14.  Or create your own file such as ``tests\tests.myapp.js``.  
15.  Add new files to the ``tests`` direction by editing ``packages\mocha-runner\package.js``.  (Yes, it's hacky.  Need to fix this.)  
16.  Extend the ``proxy.methods.phantomjs.js`` file.  
17.  Or copy the ``proxy.methods.phantomjs.js`` file into a ``proxy.methods.myapp.js`` file.  



------------------------
### License

MongoDB - MIT License
Node.js - MIT License
Meteor.js - MIT License
LESS - MIT License
Font-Awesome - MIT License
Bootstrap-3 - MIT License
Iron Router - MIT License
Mocha - MIT License
Chai - MIT License
Mocha-Web - MIT License

