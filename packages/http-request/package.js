Package.describe({
    summary: "Meteor wrapper for Request NPM module."
});

Npm.depends({
    "request": "2.27.0"
});

Package.on_use(function (api, where) {
    api.add_files('request.js', 'server');
    api.export('SimpleHttpClient', 'server');
});