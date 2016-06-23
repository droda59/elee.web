var gulp = require("gulp");
var paths = require("../paths");

gulp.task("watch", ["watch-ts", "watch-html", "watch-sass"]);

gulp.task("watch-ts", ["serve"], function () {
    gulp.watch([paths.sources], { interval: 3000 }, ["build-ts"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-html", ["serve"], function () {
    gulp.watch([paths.views], { interval: 1000 }, ["build-html"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-sass", ["serve"], function () {
    gulp.watch([paths.styles], { interval: 2000 }, ["build-sass"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});
