var aurelia = require("aurelia-cli");

  aurelia.command("bundle", {
    js: {
      "dist/app-bundle": {
        modules: [
          "aurelia-bootstrapper",
          "aurelia-http-client",
          "aurelia-router",
          "aurelia-animator-css",
          "aurelia-templating-binding",
          "aurelia-templating-resources",
          "aurelia-templating-router",
          "aurelia-loader-default",
          "aurelia-history-browser"
        ],
        options: {
          inject: true,
          minify: true
        }
      }
    }
    /*,
    template: {
      "dist/app-bundle": {
        pattern: "app/xx/x.html",
        options: {
          inject: true
        }
      }
    }*/
  });