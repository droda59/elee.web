var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var changed = require("gulp-changed");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var es = require("event-stream");
var browserSync = require("browser-sync").create();
var paths = require("../paths");

gulp.task("default", ["build"]);
gulp.task("build", ["build-ts", "build-html", "build-sass", "copy-files"]);

var typescriptCompiler = typescriptCompiler || null;
gulp.task("build-ts", function() {
    if(!typescriptCompiler) {
        typescriptCompiler = typescript.createProject("tsconfig.json", {
            "typescript": require("typescript")
        });
    }

    return gulp.src(paths.sources)
        .pipe(plumber())
        .pipe(changed(paths.sources, { extension: ".ts" }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(typescript(typescriptCompiler))
        .pipe(sourcemaps.write(".", {includeContent: false, sourceRoot: "/app"}))
        .pipe(gulp.dest(paths.outputApp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-html", function () {
    return gulp.src(paths.views)
        .pipe(changed(paths.views, { extension: ".html" }))
        .pipe(gulp.dest(paths.outputApp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-sass", function () {
    var appSass = gulp.src([
        paths.app + "shared/assets/css/main.scss",
        paths.app + "welcome/assets/css/main.scss",
        paths.app + "quick-recipe/assets/css/main.scss"
    ])
        .pipe(changed(paths.styles, { extension: ".scss" }))
        .pipe(sass())

    var externals = gulp.src(paths.app + "**/*.css");

    return es.concat(appSass, externals)
        .pipe(concat("style.css"))
        .pipe(gulp.dest(paths.outputApp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy-files", function () {
    return gulp.src(paths.app + "**/*.{json,png,jpg,svg,woff,woff2,ttf}")
        .pipe(gulp.dest(paths.outputApp));
});
