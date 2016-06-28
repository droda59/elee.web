var paths = require("./paths");

module.exports = {
    "bundles": {
        "dist/app-bundle": {
            includes: [
                "[**/*.js]",
                "**/*.html!text"
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "dist/aurelia-bundle": {
            includes: [
                "aurelia-animator-css",
                "aurelia-bootstrapper",
                "aurelia-dialog",
                "aurelia-framework",
                "aurelia-history-browser",
                "aurelia-http-client",
                "aurelia-i18n",
                "aurelia-loader-default",
                "aurelia-logging-console",
                "aurelia-router",
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                "aurelia-google-analytics",
                "scrollmagic",
                "material-design-lite/material.js"
            ],
            options: {
                inject: true,
                minify: true,
                rev: true
            }
        }
    }
};
