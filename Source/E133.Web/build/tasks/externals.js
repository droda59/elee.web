var gulp = require("gulp");
var flatten = require("gulp-flatten");
var paths = require("../paths");

gulp.task("copy-externals", [
    "copy-externals:materialize-css",
    "copy-externals:materialize-font",
    "copy-externals:animate.css",
    "copy-externals:mdl-css"
]);

gulp.task("copy-externals:materialize-css", function () {
    return gulp.src("node_modules/materialize-css/sass/components/**/*.scss")
        //.pipe(flatten())
        .pipe(gulp.dest(paths.app + "shared/assets/css/externals/materialize-css"));
});

gulp.task("copy-externals:mdl-css", function () {
    return gulp.src(["jspm_packages/github/google/material-design-lite@**/src/**/*.scss",
        "!/**/material-design-lite.scss",
        "!/**/material-design-lite-grid.scss",
        "!/**/styleguide.scss",
        "!/**/template.scss"], { base: './jspm_packages/github/google/material-design-lite@1.1.3/src' })
        .pipe(gulp.dest(paths.app + "shared/assets/css/externals/material-design-lite-css"));
});

gulp.task("copy-externals:materialize-font", function () {
    return gulp.src("jspm_packages/npm/materialize-css@**/font/**/*")
        .pipe(flatten())
        .pipe(gulp.dest(paths.app + "shared/assets/fonts"));
});

gulp.task("copy-externals:animate.css", function () {
    return gulp.src("jspm_packages/npm/animate.css@**/*.css")
        .pipe(flatten())
        .pipe(gulp.dest(paths.app + "shared/assets/css/externals/animate.css"));
});
