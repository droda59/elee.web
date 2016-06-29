var gulp = require("gulp");
var karma = require("karma").Server;

gulp.task("test", function (done) {
    new karma({
        configFile: __dirname + "/../../karma.conf.js",
        singleRun: true
    }, function () { done(); }).start();
});
