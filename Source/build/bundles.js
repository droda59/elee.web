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
                "aos",
                "aurelia-animator-css",
                "aurelia-bootstrapper",
                "aurelia-configuration",
                "aurelia-dialog",
                "aurelia-dragula",
                "aurelia-dragula/**/*.css!text",
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
                "aurelia-ui-virtualization",
                "aurelia-validation",
                "aurelia-google-analytics",
                "aurelia-materialize-bridge",
                "aurelia-materialize-bridge/**/*.html!text",
                "aurelia-materialize-bridge/**/*.css!text",
                "i18next-xhr-backend",
                "fetch",
                "moment"
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
