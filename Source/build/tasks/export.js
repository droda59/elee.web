var gulp = require("gulp");
var concat = require("gulp-concat");
var vinylPaths = require("vinyl-paths");
var del = require("del");
var runSequence = require("run-sequence");
var paths = require("../paths");
var bundles = require("../bundles");

gulp.task("export", function (callback) {
    return runSequence(
        ["clean", "export:clean"],
        "build",
        ["bundle", "minify-css", "images"],
        "export:copy",
        callback
    );
});

gulp.task("export:clean", function () {
    return gulp.src([paths.export])
        .pipe(vinylPaths(del));
});

gulp.task("export:copy", function () {
    return gulp.src([
        "index.html",
        "web.config",
        "config.js",
        "favicon.ico",
        paths.outputApp + "style.css",
        paths.outputApp + "**/*.+(json|png|jpg)",
        paths.outputApp + "**/Material*.+(eot|svg|woff|woff2|ttf)",
        "jspm_packages/system.js",
        "jspm_packages/system.js.map",
        "jspm_packages/system-polyfills.js",
        "jspm_packages/system-csp-production.js",
        "jspm_packages/github/systemjs/plugin-text@**.js",
        "jspm_packages/github/systemjs/plugin-text@**/text.js",
        "jspm_packages/npm/jquery@**/dist/jquery.min.js",
        "jspm_packages/npm/materialize-css@**/dist/js/materialize.min.js",
        "jspm_packages/npm/moment@**/moment.js",
        "jspm_packages/npm/moment@**/locale/fr.js",
    ].concat(getBundles()), { base: "." })
        .pipe(gulp.dest(paths.export))
});

function getBundles() {
    var bl = [];
    for (b in bundles.bundles) {
        bl.push(b + ".js");
    }

    return bl;
}
