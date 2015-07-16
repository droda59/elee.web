var aurelia = require('aurelia-cli');

  aurelia.command('bundle', {
    js: {
      "app-bundle": {
        modules: [
          'aurelia-bootstrapper',
          'aurelia-http-client',
          'aurelia-router',
          'aurelia-animator-css',
          'github:aurelia/templating-binding@0.12.0',
          'github:aurelia/templating-resources@0.12.1',
          'github:aurelia/templating-router@0.13.0',
          'github:aurelia/loader-default@0.8.0',
          'github:aurelia/history-browser@0.5.0'
        ],
        options: {
          inject: true,
          minify: true
        }
      }
    },
    template: {
      "app-bundle": {
        pattern: "Views/**/*.html",
        options: {
          inject: true
        }
      }
    }
  });