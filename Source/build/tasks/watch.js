var gulp = require("gulp");
var browserSync = require("browser-sync");
var paths = require("../paths");

function reportChange(event) {
    console.log("File " + event.path + " was " + event.type + ", running tasks...");
}

gulp.task("watch", ["watch-ts", "watch-html", "watch-sass"]);

gulp.task("watch-ts", ["serve"], function () {
    gulp.watch([paths.sources], { interval: 3000 }, ["build-ts", browserSync.reload])
        .on("change", reportChange);
});

gulp.task("watch-html", ["serve"], function () {
    gulp.watch([paths.views], { interval: 1000 }, ["build-html", browserSync.reload])
        .on("change", reportChange);
});

gulp.task("watch-sass", ["serve"], function () {
    gulp.watch([paths.styles], { interval: 2000 }, ["build-sass"])
        .on("change", reportChange);
});
