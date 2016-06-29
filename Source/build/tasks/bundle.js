var gulp = require("gulp");
var bundler = require("aurelia-bundler");
var bundles = require("../bundles");

var config = {
    force: true,
    baseURL: ".",                   // `baseURL of the application`
    configPath: "./config.js",      // `config.js` path. Must be within `baseURL`
    bundles: bundles.bundles
}

gulp.task("bundle", ["unbundle"], function () {
    return bundler.bundle(config);
});

gulp.task("unbundle", function () {
    return bundler.unbundle(config);
});
