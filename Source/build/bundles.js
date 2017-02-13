var paths = require("./paths");
var args = require("./args");

var includes = [
    "aos",
    "aurelia-animator-css",
    "aurelia-bootstrapper",
    "aurelia-configuration",
    "aurelia-framework",
    "aurelia-history-browser",
    "aurelia-fetch-client",
    "aurelia-i18n",
    "aurelia-infinite-scroll",
    "aurelia-loader-default",
    "aurelia-logging-console",
    "aurelia-router",
    "aurelia-templating-binding",
    "aurelia-templating-resources",
    "aurelia-templating-router",
    "aurelia-validation",
    "aurelia-google-analytics",
    "aurelia-materialize-bridge",
    "aurelia-materialize-bridge/**/*.html!text",
    "aurelia-materialize-bridge/**/*.css!text",
    "i18next-xhr-backend",
    "fetch"
];

// includes.push("aurelia-dialog");

if (args.env === "dev") {
    includes.push("aurelia-dragula");
    includes.push("aurelia-dragula/**/*.css!text");
    includes.push("aurelia-ui-virtualization");
}

module.exports = {
    "bundles": {
        "dist/app-bundle": {
            includes: [
                "[**/*.js]",
                "**/*.html!text"
            ],
            options: {
                inject: true,
                minify: true,
                rev: true
            }
        },
        "dist/aurelia-bundle": {
            includes: includes,
            options: {
                inject: true,
                minify: true,
                depCache: false,
                rev: true
            }
        }
    }
};
