var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var runSequence = require("run-sequence");
var rename = require("gulp-rename");
var changed = require("gulp-changed");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var es = require("event-stream");
var browserSync = require("browser-sync");
var path = require("path");
var paths = require("../paths");
var args = require("../args");

var sassSources = [
    `${paths.app}shared/**/assets/css/main.scss`,
    `${paths.app}website/components/page-header/page-header.scss`,
    `${paths.app}website/**/assets/css/main.scss`,
    `${paths.app}quick-recipe/**/assets/css/main.scss`
];

var htmlSources = [
    `${paths.app}*.html`,
    `${paths.app}resources/*.html`,
    `${paths.app}resources/**/*.html`,
    `${paths.app}shared/*.html`,
    `${paths.app}shared/**/*.html`,
    `${paths.app}website/*.html`,
    `${paths.app}website/**/*.html`,
    `${paths.app}quick-recipe/*.html`,
    `${paths.app}quick-recipe/**/*.html`
];

var appSources = [
    `${paths.app}*.ts`,
    `${paths.app}resources/*.ts`,
    `${paths.app}resources/**/*.ts`,
    `${paths.app}shared/*.ts`,
    `${paths.app}shared/**/*.ts`,
    `${paths.app}website/*.ts`,
    `${paths.app}website/**/*.ts`,
    `${paths.app}quick-recipe/*.ts`,
    `${paths.app}quick-recipe/**/*.ts`
];

if (args.env === "dev") {
    sassSources.push(`${paths.app}administration/**/assets/css/main.scss`);
    htmlSources.push(`${paths.app}administration/*.html`);
    htmlSources.push(`${paths.app}administration/**/*.html`);
    appSources.push(`${paths.app}administration/*.ts`);
    appSources.push(`${paths.app}administration/**/*.ts`);
}

gulp.task("default", ["build"]);
gulp.task("build", function (callback) {
    return runSequence(
        ["copy-environment", "copy-files"],
        ["build-ts", "build-html", "build-sass"],
        callback
    );
});

var typescriptCompiler = typescriptCompiler || null;
gulp.task("build-ts", function () {
    if (!typescriptCompiler) {
        typescriptCompiler = typescript.createProject("tsconfig.json", {
            "typescript": require("typescript")
        });
    }

    return gulp.src(appSources, {base : "."})
        .pipe(plumber())
        .pipe(changed(paths.sources, { extension: ".ts" }))
        // .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(typescriptCompiler())
        // .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "/app" }))
        .pipe(gulp.dest(paths.output));
});

gulp.task("build-html", function () {
    return gulp.src(htmlSources, {base : "."})
        .pipe(changed(paths.views, { extension: ".html" }))
        .pipe(gulp.dest(paths.output));
});

gulp.task("build-sass", function () {
    var appSass = gulp.src(sassSources, {base : "."})
        .pipe(changed(paths.styles, { extension: ".scss" }))
        .pipe(sass())

    var externals = gulp.src(paths.app + "**/*.css");

    return es.concat(appSass, externals)
        .pipe(concat("style.css"))
        .pipe(gulp.dest(paths.outputApp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy-environment", function () {
    return gulp.src(`environments/${args.env}.ts`)
        .pipe(rename("environment.ts"))
        .pipe(gulp.dest(paths.app));
});

gulp.task("copy-files", function () {
    return gulp.src(paths.app + "**/*.{ico,json,png,jpg,jpeg,svg,woff,woff2,ttf}")
        .pipe(gulp.dest(paths.outputApp));
});
