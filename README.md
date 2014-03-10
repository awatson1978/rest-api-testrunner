## Api TestRunner

**api-testrunner** is a REST API test runner built using Meteor.  The only thing it's designed for is testing REST endpoints.  



### Basic Installation

````sh
# Should be as simple as cloning the repository...  
git clone https://github.com/awatson1978/rest-api-testrunner.git

# And then running it.  Be sure not to run it on the same port as rest-api!
sudo mrt -p 3200
```` 

### Configure Testrunner to Point At REST API  

````js
// /client/controllers/page.configuration.js
Session.setDefault('browser_window_location', 'http://localhost:3000');
```` 


### License

MIT License.  Use as you will.
