var gulp = require("gulp");
var flatten = require("gulp-flatten");
var paths = require("../paths");

gulp.task("copy-externals", [
    "copy-externals:materialize-css",
    "copy-externals:materialize-font",
    "copy-externals:animate.css"
]);

gulp.task("copy-externals:materialize-css", function () {
    return gulp.src("node_modules/materialize-css/sass/components/**/*.scss")
        //.pipe(flatten())
        .pipe(gulp.dest(paths.app + "shared/assets/css/externals/materialize-css"));
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
