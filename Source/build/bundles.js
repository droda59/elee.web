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
                minify: true,
                rev: true
            }
        },
        "dist/aurelia-bundle": {
            includes: [
                "aurelia-animator-css",
                "aurelia-bootstrapper",
                "aurelia-configuration",
                "aurelia-dialog",
                "aurelia-dragula",
                "aurelia-framework",
                "aurelia-history-browser",
                "aurelia-fetch-client",
                "aurelia-i18n",
                "i18next-xhr-backend",
                "aurelia-loader-default",
                "aurelia-logging-console",
                "aurelia-router",
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                "aurelia-ui-virtualization",
                "aurelia-google-analytics",
                "aurelia-materialize-bridge"
            ],
            options: {
                inject: true,
                minify: true,
                depCache: false,
                rev: true
            }
        }
    }
};
