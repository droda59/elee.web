System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "animate.css": "npm:animate.css@3.5.1",
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0",
    "aurelia-binding": "npm:aurelia-binding@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.1",
    "aurelia-google-analytics": "github:miguelzakharia/aurelia-google-analytics@1.0.4",
    "aurelia-history": "npm:aurelia-history@1.0.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.0",
    "aurelia-i18n": "npm:aurelia-i18n@1.0.0",
    "aurelia-loader": "npm:aurelia-loader@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging": "npm:aurelia-logging@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
    "aurelia-pal": "npm:aurelia-pal@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
    "aurelia-path": "npm:aurelia-path@1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0",
    "aurelia-router": "npm:aurelia-router@1.0.2",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
    "aurelia-templating": "npm:aurelia-templating@1.0.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "clean-css": "npm:clean-css@3.4.19",
    "core-js": "npm:core-js@1.2.7",
    "i18next-xhr-backend": "npm:i18next-xhr-backend@0.6.0",
    "jquery": "npm:jquery@2.2.4",
    "materialize-css": "npm:materialize-css@0.97.7",
    "moment": "npm:moment@2.14.1",
    "scrollmagic": "npm:scrollmagic@2.0.5",
    "text": "github:systemjs/plugin-text@0.0.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.8"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:miguelzakharia/aurelia-google-analytics@1.0.4": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-binding@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0"
    },
    "npm:aurelia-bootstrapper@1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0"
    },
    "npm:aurelia-dependency-injection@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-framework@1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-http-client@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0"
    },
    "npm:aurelia-i18n@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
      "i18next": "npm:i18next@3.4.1",
      "intl": "npm:intl@1.2.4"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-metadata@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-pal-browser@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-polyfills@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-route-recognizer@1.0.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0"
    },
    "npm:aurelia-router@1.0.2": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0"
    },
    "npm:aurelia-task-queue@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-templating-resources@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-templating-router@1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0"
    },
    "npm:aurelia-templating@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.19": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:i18next@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intl@1.2.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:materialize-css@0.97.7": {
      "css": "github:systemjs/plugin-css@0.1.26",
      "jquery": "github:components/jquery@3.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  bundles: {
    "aurelia-bundle-9b9c8b227e.js": [
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:miguelzakharia/aurelia-google-analytics@1.0.4.js",
      "github:miguelzakharia/aurelia-google-analytics@1.0.4/analytics.js",
      "github:miguelzakharia/aurelia-google-analytics@1.0.4/index.js",
      "npm:aurelia-animator-css@1.0.0.js",
      "npm:aurelia-animator-css@1.0.0/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.1.js",
      "npm:aurelia-binding@1.0.1/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0.js",
      "npm:aurelia-dependency-injection@1.0.0/aurelia-dependency-injection.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/ai-dialog-body.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/ai-dialog-footer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/ai-dialog-header.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/ai-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/attach-focus.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/aurelia-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-configuration.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-controller.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-options.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-renderer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-result.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/dialog-service.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/lifecycle.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.0/renderer.js",
      "npm:aurelia-event-aggregator@1.0.0.js",
      "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator.js",
      "npm:aurelia-framework@1.0.1.js",
      "npm:aurelia-framework@1.0.1/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-http-client@1.0.0.js",
      "npm:aurelia-http-client@1.0.0/aurelia-http-client.js",
      "npm:aurelia-i18n@1.0.0.js",
      "npm:aurelia-i18n@1.0.0/aurelia-i18n.js",
      "npm:aurelia-i18n@1.0.0/base-i18n.js",
      "npm:aurelia-i18n@1.0.0/defaultTranslations/relative.time.js",
      "npm:aurelia-i18n@1.0.0/df.js",
      "npm:aurelia-i18n@1.0.0/i18n.js",
      "npm:aurelia-i18n@1.0.0/nf.js",
      "npm:aurelia-i18n@1.0.0/relativeTime.js",
      "npm:aurelia-i18n@1.0.0/rt.js",
      "npm:aurelia-i18n@1.0.0/t.js",
      "npm:aurelia-i18n@1.0.0/utils.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0.js",
      "npm:aurelia-logging@1.0.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0.js",
      "npm:aurelia-metadata@1.0.0/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0.js",
      "npm:aurelia-pal@1.0.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0.js",
      "npm:aurelia-path@1.0.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0.js",
      "npm:aurelia-polyfills@1.0.0/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0.js",
      "npm:aurelia-route-recognizer@1.0.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.2.js",
      "npm:aurelia-router@1.0.2/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0.js",
      "npm:aurelia-task-queue@1.0.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0.js",
      "npm:aurelia-templating-resources@1.0.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.0.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0/compose.js",
      "npm:aurelia-templating-resources@1.0.0/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0/focus.js",
      "npm:aurelia-templating-resources@1.0.0/hide.js",
      "npm:aurelia-templating-resources@1.0.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.0.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0/if.js",
      "npm:aurelia-templating-resources@1.0.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0/repeat.js",
      "npm:aurelia-templating-resources@1.0.0/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/show.js",
      "npm:aurelia-templating-resources@1.0.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/with.js",
      "npm:aurelia-templating-router@1.0.0.js",
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0/router-view.js",
      "npm:aurelia-templating@1.0.0.js",
      "npm:aurelia-templating@1.0.0/aurelia-templating.js",
      "npm:i18next@3.4.1.js",
      "npm:i18next@3.4.1/dist/commonjs/BackendConnector.js",
      "npm:i18next@3.4.1/dist/commonjs/CacheConnector.js",
      "npm:i18next@3.4.1/dist/commonjs/EventEmitter.js",
      "npm:i18next@3.4.1/dist/commonjs/Interpolator.js",
      "npm:i18next@3.4.1/dist/commonjs/LanguageUtils.js",
      "npm:i18next@3.4.1/dist/commonjs/PluralResolver.js",
      "npm:i18next@3.4.1/dist/commonjs/ResourceStore.js",
      "npm:i18next@3.4.1/dist/commonjs/Translator.js",
      "npm:i18next@3.4.1/dist/commonjs/compatibility/v1.js",
      "npm:i18next@3.4.1/dist/commonjs/defaults.js",
      "npm:i18next@3.4.1/dist/commonjs/i18next.js",
      "npm:i18next@3.4.1/dist/commonjs/index.js",
      "npm:i18next@3.4.1/dist/commonjs/logger.js",
      "npm:i18next@3.4.1/dist/commonjs/postProcessor.js",
      "npm:i18next@3.4.1/dist/commonjs/utils.js",
      "npm:i18next@3.4.1/index.js",
      "npm:process@0.11.8.js",
      "npm:process@0.11.8/browser.js",
      "npm:scrollmagic@2.0.5.js",
      "npm:scrollmagic@2.0.5/scrollmagic/uncompressed/ScrollMagic.js"
    ],
    "app-bundle.js": [
      "app/configuration.js",
      "app/main.html!github:systemjs/plugin-text@0.0.4.js",
      "app/main.js",
      "app/quick-recipe/components/help-overlay.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/help-overlay.js",
      "app/quick-recipe/components/quick-recipe-footer.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/quick-recipe-footer.js",
      "app/quick-recipe/components/quick-recipe-header.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/quick-recipe-header.js",
      "app/quick-recipe/components/quick-recipe-step.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/quick-recipe-step.js",
      "app/quick-recipe/components/steps/step-action.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/steps/step-action.js",
      "app/quick-recipe/components/steps/step-enumeration.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/steps/step-enumeration.js",
      "app/quick-recipe/components/steps/step-ingredient.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/steps/step-ingredient.js",
      "app/quick-recipe/components/steps/step-text.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/steps/step-text.js",
      "app/quick-recipe/components/steps/step-timer.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/components/steps/step-timer.js",
      "app/quick-recipe/models/quick-recipe-timer.js",
      "app/quick-recipe/models/quick-recipe.js",
      "app/quick-recipe/quick-recipe-page.html!github:systemjs/plugin-text@0.0.4.js",
      "app/quick-recipe/quick-recipe-page.js",
      "app/quick-recipe/scroll-coordinator.js",
      "app/quick-recipe/timer-coordinator.js",
      "app/shared/aurelia-materialize.js",
      "app/shared/components/comments-form.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/comments-form.js",
      "app/shared/components/measurable-ingredient.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/measurable-ingredient.js",
      "app/shared/components/page-footer/page-footer.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/page-footer/page-footer.js",
      "app/shared/components/page-header/page-header.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/page-header/page-header.js",
      "app/shared/components/settings-modal.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/settings-modal.js",
      "app/shared/components/typeform.html!github:systemjs/plugin-text@0.0.4.js",
      "app/shared/components/typeform.js",
      "app/shared/models/ingredient.js",
      "app/shared/models/measure-units/centilitre.js",
      "app/shared/models/measure-units/cup.js",
      "app/shared/models/measure-units/decilitre.js",
      "app/shared/models/measure-units/fluid-ounce.js",
      "app/shared/models/measure-units/gram.js",
      "app/shared/models/measure-units/kilogram.js",
      "app/shared/models/measure-units/litre.js",
      "app/shared/models/measure-units/measure-unit.js",
      "app/shared/models/measure-units/millilitre.js",
      "app/shared/models/measure-units/ounce.js",
      "app/shared/models/measure-units/pinch.js",
      "app/shared/models/measure-units/pound.js",
      "app/shared/models/measure-units/tablespoon.js",
      "app/shared/models/measure-units/teaspoon.js",
      "app/shared/models/measure-units/unit.js",
      "app/shared/models/quantity.js",
      "app/shared/models/settings.js",
      "app/shared/models/timer.js",
      "app/shared/quantity-converter.js",
      "app/shared/settings-manager.js",
      "app/shared/text-utils.js",
      "app/shared/validation-rules/time-validation-rule.js",
      "app/shared/value-converters/duration-format.js",
      "app/shared/value-converters/quantity-human-format.js",
      "app/shared/value-converters/time-format.js",
      "app/shared/value-converters/uppercase-first-letter-format.js",
      "app/website/about/about.html!github:systemjs/plugin-text@0.0.4.js",
      "app/website/about/about.js",
      "app/website/home.html!github:systemjs/plugin-text@0.0.4.js",
      "app/website/home.js",
      "app/website/welcome/welcome.html!github:systemjs/plugin-text@0.0.4.js",
      "app/website/welcome/welcome.js"
    ]
  }
});