System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.0.3",
    "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
    "aurelia-dialog": "npm:aurelia-dialog@0.5.3",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
    "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.0.1",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.0-beta.1.0.1",
    "aurelia-i18n": "npm:aurelia-i18n@0.4.6",
    "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.0.2",
    "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1",
    "aurelia-materialize": "github:aurelia-ui-toolkits/aurelia-materialize-plugin-old@master",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
    "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
    "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.0.1",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
    "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.0.2",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.0.4",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.0.5",
    "aurelia-validation": "npm:aurelia-validation@0.6.0",
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "clean-css": "npm:clean-css@3.4.9",
    "compass": "npm:compass@0.1.1",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "greensock": "github:greensock/GreenSock-JS@1.18.0",
    "gsap": "npm:gsap@1.18.2",
    "jquery": "github:components/jquery@2.2.0",
    "materialize": "npm:materialize-css@0.97.5",
    "moment": "npm:moment@2.11.1",
    "scrollmagic": "npm:scrollmagic@2.0.5",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "github:aurelia-ui-toolkits/aurelia-materialize-plugin-old@master": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
      "aurelia-http-client": "npm:aurelia-http-client@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "materialize": "github:dogfalo/materialize@0.96.1",
      "showdown": "github:showdownjs/showdown@1.3.0"
    },
    "github:dogfalo/materialize@0.96.1": {
      "css": "github:systemjs/plugin-css@0.1.20",
      "jquery": "github:components/jquery@2.2.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
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
      "process": "npm:process@0.11.2"
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
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.0.3": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:aurelia-binding@1.0.0-beta.1.0.5": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.0.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.0.2",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.0.3",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.0.2",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.0.4",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.0.5",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-dialog@0.5.3": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "text": "github:systemjs/plugin-text@0.0.3"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1"
    },
    "npm:aurelia-framework@1.0.0-beta.1.0.8": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.0.1": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-http-client@1.0.0-beta.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-i18n@0.4.6": {
      "Intl.js": "github:andyearnshaw/Intl.js@0.1.4",
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.0.4",
      "i18next": "github:i18next/i18next@1.11.2"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.0.2": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-loader@1.0.0-beta.1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-metadata@1.0.0-beta.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-router@1.0.0-beta.1.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.0.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.0.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.0.5": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:aurelia-templating@1.0.0-beta.1.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-validation@0.6.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:block-stream@0.0.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:brace-expansion@1.1.2": {
      "balanced-match": "npm:balanced-match@0.3.0",
      "concat-map": "npm:concat-map@0.0.1"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.0.5",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.9": {
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
    "npm:compass@0.1.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:fstream@0.1.31": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-fs": "npm:graceful-fs@3.0.8",
      "inherits": "npm:inherits@2.0.1",
      "mkdirp": "npm:mkdirp@0.5.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "rimraf": "npm:rimraf@2.5.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:glob@6.0.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inflight": "npm:inflight@1.0.4",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@3.0.0",
      "once": "npm:once@1.3.3",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-is-absolute": "npm:path-is-absolute@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:graceful-fs@3.0.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:gsap@1.18.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:hammerjs@2.0.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inflight@1.0.4": {
      "once": "npm:once@1.3.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:materialize-css@0.97.5": {
      "hammerjs": "npm:hammerjs@2.0.6",
      "jquery": "npm:jquery@2.2.0",
      "node-archiver": "npm:node-archiver@0.2.0"
    },
    "npm:minimatch@3.0.0": {
      "brace-expansion": "npm:brace-expansion@1.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@0.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:moment@2.11.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-archiver@0.2.0": {
      "fstream": "npm:fstream@0.1.31",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tar": "npm:tar@0.1.20",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:once@1.3.3": {
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-is-absolute@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process-nextick-args@1.0.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.6",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:rimraf@2.5.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@6.0.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:scrollmagic@2.0.5": {
      "gsap": "npm:gsap@1.18.2",
      "jquery": "github:components/jquery@2.2.0"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:tar@0.1.20": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "block-stream": "npm:block-stream@0.0.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "fstream": "npm:fstream@0.1.31",
      "inherits": "npm:inherits@2.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
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
    "app-bundle.js": [
      "app.html!github:systemjs/plugin-text@0.0.2.js",
      "app.js",
      "main.js"
    ],
    "aurelia-bundle.js": [
      "github:i18next/i18next@1.11.2.js",
      "github:i18next/i18next@1.11.2/i18next.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.0.3.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.0.3/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-beta.1.0.5.js",
      "npm:aurelia-binding@1.0.0-beta.1.0.5/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1/aurelia-dependency-injection.js",
      "npm:aurelia-dialog@0.5.3.js",
      "npm:aurelia-dialog@0.5.3/ai-dialog-body.js",
      "npm:aurelia-dialog@0.5.3/ai-dialog-footer.js",
      "npm:aurelia-dialog@0.5.3/ai-dialog-header.js",
      "npm:aurelia-dialog@0.5.3/ai-dialog.js",
      "npm:aurelia-dialog@0.5.3/attach-focus.js",
      "npm:aurelia-dialog@0.5.3/dialog-controller.js",
      "npm:aurelia-dialog@0.5.3/dialog-renderer.js",
      "npm:aurelia-dialog@0.5.3/dialog-service.js",
      "npm:aurelia-dialog@0.5.3/index.js",
      "npm:aurelia-dialog@0.5.3/lifecycle.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1/aurelia-event-aggregator.js",
      "npm:aurelia-framework@1.0.0-beta.1.0.8.js",
      "npm:aurelia-framework@1.0.0-beta.1.0.8/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.0.1.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.0.1/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0-beta.1.js",
      "npm:aurelia-history@1.0.0-beta.1/aurelia-history.js",
      "npm:aurelia-http-client@1.0.0-beta.1.0.1.js",
      "npm:aurelia-http-client@1.0.0-beta.1.0.1/aurelia-http-client.js",
      "npm:aurelia-i18n@0.4.6.js",
      "npm:aurelia-i18n@0.4.6/aurelia-i18n.js",
      "npm:aurelia-i18n@0.4.6/base-i18n.js",
      "npm:aurelia-i18n@0.4.6/defaultTranslations/relative.time.js",
      "npm:aurelia-i18n@0.4.6/df.js",
      "npm:aurelia-i18n@0.4.6/i18n.js",
      "npm:aurelia-i18n@0.4.6/nf.js",
      "npm:aurelia-i18n@0.4.6/relativeTime.js",
      "npm:aurelia-i18n@0.4.6/rt.js",
      "npm:aurelia-i18n@0.4.6/t.js",
      "npm:aurelia-i18n@0.4.6/utils.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.0.2.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.0.2/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-beta.1.0.1.js",
      "npm:aurelia-loader@1.0.0-beta.1.0.1/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.js",
      "npm:aurelia-logging-console@1.0.0-beta.1/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0-beta.1.js",
      "npm:aurelia-logging@1.0.0-beta.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-beta.1.js",
      "npm:aurelia-metadata@1.0.0-beta.1/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.0.3.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.0.3/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-beta.1.0.2.js",
      "npm:aurelia-pal@1.0.0-beta.1.0.2/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-beta.1.js",
      "npm:aurelia-path@1.0.0-beta.1/aurelia-path.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.0-beta.1.0.1.js",
      "npm:aurelia-router@1.0.0-beta.1.0.1/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.0.1.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.0.1/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.0.2.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.0.2/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/compile-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/compose.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/focus.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/if.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/show.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/view-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.0.4/with.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.0.5.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.0.5/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.0.5/route-href.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.0.5/route-loader.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.0.5/router-view.js",
      "npm:aurelia-templating@1.0.0-beta.1.0.3.js",
      "npm:aurelia-templating@1.0.0-beta.1.0.3/aurelia-templating.js",
      "npm:aurelia-validation@0.6.0.js",
      "npm:aurelia-validation@0.6.0/debouncer.js",
      "npm:aurelia-validation@0.6.0/decorators.js",
      "npm:aurelia-validation@0.6.0/index.js",
      "npm:aurelia-validation@0.6.0/path-observer.js",
      "npm:aurelia-validation@0.6.0/strategies/twbootstrap-view-strategy.js",
      "npm:aurelia-validation@0.6.0/utilities.js",
      "npm:aurelia-validation@0.6.0/validate-custom-attribute.js",
      "npm:aurelia-validation@0.6.0/validation-config.js",
      "npm:aurelia-validation@0.6.0/validation-group-builder.js",
      "npm:aurelia-validation@0.6.0/validation-group.js",
      "npm:aurelia-validation@0.6.0/validation-locale.js",
      "npm:aurelia-validation@0.6.0/validation-property.js",
      "npm:aurelia-validation@0.6.0/validation-result.js",
      "npm:aurelia-validation@0.6.0/validation-rules-collection.js",
      "npm:aurelia-validation@0.6.0/validation-rules.js",
      "npm:aurelia-validation@0.6.0/validation-view-strategy.js",
      "npm:aurelia-validation@0.6.0/validation.js",
      "npm:core-js@1.2.6.js",
      "npm:core-js@1.2.6/index.js",
      "npm:core-js@1.2.6/modules/$.a-function.js",
      "npm:core-js@1.2.6/modules/$.add-to-unscopables.js",
      "npm:core-js@1.2.6/modules/$.an-object.js",
      "npm:core-js@1.2.6/modules/$.array-copy-within.js",
      "npm:core-js@1.2.6/modules/$.array-fill.js",
      "npm:core-js@1.2.6/modules/$.array-includes.js",
      "npm:core-js@1.2.6/modules/$.array-methods.js",
      "npm:core-js@1.2.6/modules/$.array-species-create.js",
      "npm:core-js@1.2.6/modules/$.classof.js",
      "npm:core-js@1.2.6/modules/$.cof.js",
      "npm:core-js@1.2.6/modules/$.collection-strong.js",
      "npm:core-js@1.2.6/modules/$.collection-to-json.js",
      "npm:core-js@1.2.6/modules/$.collection-weak.js",
      "npm:core-js@1.2.6/modules/$.collection.js",
      "npm:core-js@1.2.6/modules/$.core.js",
      "npm:core-js@1.2.6/modules/$.ctx.js",
      "npm:core-js@1.2.6/modules/$.defined.js",
      "npm:core-js@1.2.6/modules/$.descriptors.js",
      "npm:core-js@1.2.6/modules/$.dom-create.js",
      "npm:core-js@1.2.6/modules/$.enum-keys.js",
      "npm:core-js@1.2.6/modules/$.export.js",
      "npm:core-js@1.2.6/modules/$.fails-is-regexp.js",
      "npm:core-js@1.2.6/modules/$.fails.js",
      "npm:core-js@1.2.6/modules/$.fix-re-wks.js",
      "npm:core-js@1.2.6/modules/$.flags.js",
      "npm:core-js@1.2.6/modules/$.for-of.js",
      "npm:core-js@1.2.6/modules/$.get-names.js",
      "npm:core-js@1.2.6/modules/$.global.js",
      "npm:core-js@1.2.6/modules/$.has.js",
      "npm:core-js@1.2.6/modules/$.hide.js",
      "npm:core-js@1.2.6/modules/$.html.js",
      "npm:core-js@1.2.6/modules/$.invoke.js",
      "npm:core-js@1.2.6/modules/$.iobject.js",
      "npm:core-js@1.2.6/modules/$.is-array-iter.js",
      "npm:core-js@1.2.6/modules/$.is-array.js",
      "npm:core-js@1.2.6/modules/$.is-integer.js",
      "npm:core-js@1.2.6/modules/$.is-object.js",
      "npm:core-js@1.2.6/modules/$.is-regexp.js",
      "npm:core-js@1.2.6/modules/$.iter-call.js",
      "npm:core-js@1.2.6/modules/$.iter-create.js",
      "npm:core-js@1.2.6/modules/$.iter-define.js",
      "npm:core-js@1.2.6/modules/$.iter-detect.js",
      "npm:core-js@1.2.6/modules/$.iter-step.js",
      "npm:core-js@1.2.6/modules/$.iterators.js",
      "npm:core-js@1.2.6/modules/$.js",
      "npm:core-js@1.2.6/modules/$.keyof.js",
      "npm:core-js@1.2.6/modules/$.library.js",
      "npm:core-js@1.2.6/modules/$.math-expm1.js",
      "npm:core-js@1.2.6/modules/$.math-log1p.js",
      "npm:core-js@1.2.6/modules/$.math-sign.js",
      "npm:core-js@1.2.6/modules/$.microtask.js",
      "npm:core-js@1.2.6/modules/$.object-assign.js",
      "npm:core-js@1.2.6/modules/$.object-define.js",
      "npm:core-js@1.2.6/modules/$.object-sap.js",
      "npm:core-js@1.2.6/modules/$.object-to-array.js",
      "npm:core-js@1.2.6/modules/$.own-keys.js",
      "npm:core-js@1.2.6/modules/$.partial.js",
      "npm:core-js@1.2.6/modules/$.path.js",
      "npm:core-js@1.2.6/modules/$.property-desc.js",
      "npm:core-js@1.2.6/modules/$.redefine-all.js",
      "npm:core-js@1.2.6/modules/$.redefine.js",
      "npm:core-js@1.2.6/modules/$.replacer.js",
      "npm:core-js@1.2.6/modules/$.same-value.js",
      "npm:core-js@1.2.6/modules/$.set-proto.js",
      "npm:core-js@1.2.6/modules/$.set-species.js",
      "npm:core-js@1.2.6/modules/$.set-to-string-tag.js",
      "npm:core-js@1.2.6/modules/$.shared.js",
      "npm:core-js@1.2.6/modules/$.species-constructor.js",
      "npm:core-js@1.2.6/modules/$.strict-new.js",
      "npm:core-js@1.2.6/modules/$.string-at.js",
      "npm:core-js@1.2.6/modules/$.string-context.js",
      "npm:core-js@1.2.6/modules/$.string-pad.js",
      "npm:core-js@1.2.6/modules/$.string-repeat.js",
      "npm:core-js@1.2.6/modules/$.string-trim.js",
      "npm:core-js@1.2.6/modules/$.task.js",
      "npm:core-js@1.2.6/modules/$.to-index.js",
      "npm:core-js@1.2.6/modules/$.to-integer.js",
      "npm:core-js@1.2.6/modules/$.to-iobject.js",
      "npm:core-js@1.2.6/modules/$.to-length.js",
      "npm:core-js@1.2.6/modules/$.to-object.js",
      "npm:core-js@1.2.6/modules/$.to-primitive.js",
      "npm:core-js@1.2.6/modules/$.uid.js",
      "npm:core-js@1.2.6/modules/$.wks.js",
      "npm:core-js@1.2.6/modules/core.delay.js",
      "npm:core-js@1.2.6/modules/core.dict.js",
      "npm:core-js@1.2.6/modules/core.function.part.js",
      "npm:core-js@1.2.6/modules/core.get-iterator-method.js",
      "npm:core-js@1.2.6/modules/core.get-iterator.js",
      "npm:core-js@1.2.6/modules/core.is-iterable.js",
      "npm:core-js@1.2.6/modules/core.log.js",
      "npm:core-js@1.2.6/modules/core.number.iterator.js",
      "npm:core-js@1.2.6/modules/core.object.classof.js",
      "npm:core-js@1.2.6/modules/core.object.define.js",
      "npm:core-js@1.2.6/modules/core.object.is-object.js",
      "npm:core-js@1.2.6/modules/core.object.make.js",
      "npm:core-js@1.2.6/modules/core.string.escape-html.js",
      "npm:core-js@1.2.6/modules/core.string.unescape-html.js",
      "npm:core-js@1.2.6/modules/es5.js",
      "npm:core-js@1.2.6/modules/es6.array.copy-within.js",
      "npm:core-js@1.2.6/modules/es6.array.fill.js",
      "npm:core-js@1.2.6/modules/es6.array.find-index.js",
      "npm:core-js@1.2.6/modules/es6.array.find.js",
      "npm:core-js@1.2.6/modules/es6.array.from.js",
      "npm:core-js@1.2.6/modules/es6.array.iterator.js",
      "npm:core-js@1.2.6/modules/es6.array.of.js",
      "npm:core-js@1.2.6/modules/es6.array.species.js",
      "npm:core-js@1.2.6/modules/es6.function.has-instance.js",
      "npm:core-js@1.2.6/modules/es6.function.name.js",
      "npm:core-js@1.2.6/modules/es6.map.js",
      "npm:core-js@1.2.6/modules/es6.math.acosh.js",
      "npm:core-js@1.2.6/modules/es6.math.asinh.js",
      "npm:core-js@1.2.6/modules/es6.math.atanh.js",
      "npm:core-js@1.2.6/modules/es6.math.cbrt.js",
      "npm:core-js@1.2.6/modules/es6.math.clz32.js",
      "npm:core-js@1.2.6/modules/es6.math.cosh.js",
      "npm:core-js@1.2.6/modules/es6.math.expm1.js",
      "npm:core-js@1.2.6/modules/es6.math.fround.js",
      "npm:core-js@1.2.6/modules/es6.math.hypot.js",
      "npm:core-js@1.2.6/modules/es6.math.imul.js",
      "npm:core-js@1.2.6/modules/es6.math.log10.js",
      "npm:core-js@1.2.6/modules/es6.math.log1p.js",
      "npm:core-js@1.2.6/modules/es6.math.log2.js",
      "npm:core-js@1.2.6/modules/es6.math.sign.js",
      "npm:core-js@1.2.6/modules/es6.math.sinh.js",
      "npm:core-js@1.2.6/modules/es6.math.tanh.js",
      "npm:core-js@1.2.6/modules/es6.math.trunc.js",
      "npm:core-js@1.2.6/modules/es6.number.constructor.js",
      "npm:core-js@1.2.6/modules/es6.number.epsilon.js",
      "npm:core-js@1.2.6/modules/es6.number.is-finite.js",
      "npm:core-js@1.2.6/modules/es6.number.is-integer.js",
      "npm:core-js@1.2.6/modules/es6.number.is-nan.js",
      "npm:core-js@1.2.6/modules/es6.number.is-safe-integer.js",
      "npm:core-js@1.2.6/modules/es6.number.max-safe-integer.js",
      "npm:core-js@1.2.6/modules/es6.number.min-safe-integer.js",
      "npm:core-js@1.2.6/modules/es6.number.parse-float.js",
      "npm:core-js@1.2.6/modules/es6.number.parse-int.js",
      "npm:core-js@1.2.6/modules/es6.object.assign.js",
      "npm:core-js@1.2.6/modules/es6.object.freeze.js",
      "npm:core-js@1.2.6/modules/es6.object.get-own-property-descriptor.js",
      "npm:core-js@1.2.6/modules/es6.object.get-own-property-names.js",
      "npm:core-js@1.2.6/modules/es6.object.get-prototype-of.js",
      "npm:core-js@1.2.6/modules/es6.object.is-extensible.js",
      "npm:core-js@1.2.6/modules/es6.object.is-frozen.js",
      "npm:core-js@1.2.6/modules/es6.object.is-sealed.js",
      "npm:core-js@1.2.6/modules/es6.object.is.js",
      "npm:core-js@1.2.6/modules/es6.object.keys.js",
      "npm:core-js@1.2.6/modules/es6.object.prevent-extensions.js",
      "npm:core-js@1.2.6/modules/es6.object.seal.js",
      "npm:core-js@1.2.6/modules/es6.object.set-prototype-of.js",
      "npm:core-js@1.2.6/modules/es6.object.to-string.js",
      "npm:core-js@1.2.6/modules/es6.promise.js",
      "npm:core-js@1.2.6/modules/es6.reflect.apply.js",
      "npm:core-js@1.2.6/modules/es6.reflect.construct.js",
      "npm:core-js@1.2.6/modules/es6.reflect.define-property.js",
      "npm:core-js@1.2.6/modules/es6.reflect.delete-property.js",
      "npm:core-js@1.2.6/modules/es6.reflect.enumerate.js",
      "npm:core-js@1.2.6/modules/es6.reflect.get-own-property-descriptor.js",
      "npm:core-js@1.2.6/modules/es6.reflect.get-prototype-of.js",
      "npm:core-js@1.2.6/modules/es6.reflect.get.js",
      "npm:core-js@1.2.6/modules/es6.reflect.has.js",
      "npm:core-js@1.2.6/modules/es6.reflect.is-extensible.js",
      "npm:core-js@1.2.6/modules/es6.reflect.own-keys.js",
      "npm:core-js@1.2.6/modules/es6.reflect.prevent-extensions.js",
      "npm:core-js@1.2.6/modules/es6.reflect.set-prototype-of.js",
      "npm:core-js@1.2.6/modules/es6.reflect.set.js",
      "npm:core-js@1.2.6/modules/es6.regexp.constructor.js",
      "npm:core-js@1.2.6/modules/es6.regexp.flags.js",
      "npm:core-js@1.2.6/modules/es6.regexp.match.js",
      "npm:core-js@1.2.6/modules/es6.regexp.replace.js",
      "npm:core-js@1.2.6/modules/es6.regexp.search.js",
      "npm:core-js@1.2.6/modules/es6.regexp.split.js",
      "npm:core-js@1.2.6/modules/es6.set.js",
      "npm:core-js@1.2.6/modules/es6.string.code-point-at.js",
      "npm:core-js@1.2.6/modules/es6.string.ends-with.js",
      "npm:core-js@1.2.6/modules/es6.string.from-code-point.js",
      "npm:core-js@1.2.6/modules/es6.string.includes.js",
      "npm:core-js@1.2.6/modules/es6.string.iterator.js",
      "npm:core-js@1.2.6/modules/es6.string.raw.js",
      "npm:core-js@1.2.6/modules/es6.string.repeat.js",
      "npm:core-js@1.2.6/modules/es6.string.starts-with.js",
      "npm:core-js@1.2.6/modules/es6.string.trim.js",
      "npm:core-js@1.2.6/modules/es6.symbol.js",
      "npm:core-js@1.2.6/modules/es6.weak-map.js",
      "npm:core-js@1.2.6/modules/es6.weak-set.js",
      "npm:core-js@1.2.6/modules/es7.array.includes.js",
      "npm:core-js@1.2.6/modules/es7.map.to-json.js",
      "npm:core-js@1.2.6/modules/es7.object.entries.js",
      "npm:core-js@1.2.6/modules/es7.object.get-own-property-descriptors.js",
      "npm:core-js@1.2.6/modules/es7.object.values.js",
      "npm:core-js@1.2.6/modules/es7.regexp.escape.js",
      "npm:core-js@1.2.6/modules/es7.set.to-json.js",
      "npm:core-js@1.2.6/modules/es7.string.at.js",
      "npm:core-js@1.2.6/modules/es7.string.pad-left.js",
      "npm:core-js@1.2.6/modules/es7.string.pad-right.js",
      "npm:core-js@1.2.6/modules/es7.string.trim-left.js",
      "npm:core-js@1.2.6/modules/es7.string.trim-right.js",
      "npm:core-js@1.2.6/modules/js.array.statics.js",
      "npm:core-js@1.2.6/modules/web.dom.iterable.js",
      "npm:core-js@1.2.6/modules/web.immediate.js",
      "npm:core-js@1.2.6/modules/web.timers.js",
      "npm:core-js@1.2.6/shim.js",
      "npm:process@0.11.2.js",
      "npm:process@0.11.2/browser.js"
    ]
  }
})