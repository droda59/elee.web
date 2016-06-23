var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var minifyCss = require("gulp-minify-css");
var flatten = require("gulp-flatten");
var bump = require("gulp-bump");
var paths = require("../paths");

gulp.task("minify-css", function () {
    return gulp.src(paths.outputApp + "style.css")
        .pipe(minifyCss());
});

gulp.task("images", function () {
    return gulp.src(paths.outputApp + "**/assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(paths.outputApp));
});

gulp.task("typedef", function () {
    return gulp.src("jspm_packages/npm/aurelia*/**/*.d.ts")
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("bump-version", function () {
    return gulp.src("./package.json")
        .pipe(bump({ type: "patch" })) //major|minor|patch|prerelease, e.g. "major.minor.patch-prerelease"
        .pipe(gulp.dest("./"));
});
