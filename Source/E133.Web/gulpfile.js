/// <vs AfterBuild="vs-build-Debug" Clean="clean" />
var gulp = require("gulp");
var runSequence = require("run-sequence");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var flatten = require("gulp-flatten");
var bump = require("gulp-bump");
var browserSync = require("browser-sync").create();
var changed = require("gulp-changed");
var ts = require("gulp-tsc");
var sass = require("gulp-sass");
var bundler = require("aurelia-bundler");
var imagemin = require("gulp-imagemin");
var minifyCss = require("gulp-minify-css");
var concat = require("gulp-concat");
var es = require("event-stream");
var karma = require("karma").Server;

var path = {
    package: "./package.json",
    dest: "dist/app/",
    views: "app/**/*.html",
    typescript: "app/**/*.ts",
    sass: "app/**/*.scss",
    export: "export/"
};

var bundleConfig = {
    force: true,
    baseURL: ".",                   // `baseURL of the application`
    configPath: "./config.js",      // `config.js` path. Must be within `baseURL`
    bundles: {
        "dist/app-bundle": {
            includes: [
                "[**/*.js]",
                "**/*.html!text"
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "dist/aurelia-bundle": {
            includes: [
                "aurelia-animator-css",
                "aurelia-bootstrapper",
                "aurelia-dialog",
                "aurelia-dialog/**/*.html!text",
                "aurelia-framework",
                "aurelia-history-browser",
                "aurelia-http-client",
                "aurelia-i18n",
                "aurelia-loader-default",
                "aurelia-logging-console",
                "aurelia-router",
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                "aurelia-validation",
                "aurelia-validation/resources/*",
                "aurelia-google-analytics",
                "scrollmagic",
                "material-design-lite/material.js"
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("test", function (done) {
  new karma({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, function() { done(); }).start();
});

gulp.task("typedef", function () {
    return gulp.src("jspm_packages/npm/aurelia*/**/*.d.ts")
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("bump-version", function () {
    return gulp.src(path.package)
      .pipe(bump({ type: "patch" })) //major|minor|patch|prerelease, e.g. "major.minor.patch-prerelease"
      .pipe(gulp.dest("./"));
});

gulp.task("clean", function () {
    return gulp.src("dist/")
       .pipe(vinylPaths(del));
});

gulp.task("copy-externals", [
            "copy-externals-materialize-css",
            "copy-externals-materialize-font",
            "copy-externals-animate.css",
            "copy-externals-mdl-css"
        ]);

gulp.task("copy-externals-materialize-css", function() {
  return gulp.src("node_modules/materialize-css/sass/components/**/*.scss")
        //.pipe(flatten())
        .pipe(gulp.dest("app/shared/assets/css/externals/materialize-css"));
});

gulp.task("copy-externals-mdl-css", function() {
  return gulp.src(["jspm_packages/github/google/material-design-lite@**/src/**/*.scss",
                    "!/**/material-design-lite.scss",
                    "!/**/material-design-lite-grid.scss",
                    "!/**/styleguide.scss",
                    "!/**/template.scss"], { base: './jspm_packages/github/google/material-design-lite@1.1.3/src' })
        .pipe(gulp.dest("app/shared/assets/css/externals/material-design-lite-css"));
});

gulp.task("copy-externals-materialize-font", function() {
  return gulp.src("jspm_packages/npm/materialize-css@**/font/**/*")
        .pipe(flatten())
        .pipe(gulp.dest("app/shared/assets/fonts"));
});

gulp.task("copy-externals-animate.css", function() {
  return gulp.src("jspm_packages/npm/animate.css@**/*.css")
        .pipe(flatten())
        .pipe(gulp.dest("app/shared/assets/css/externals/animate.css"));
});

gulp.task("default", ["build"]);
gulp.task("build", function (callback) {
    return runSequence(
        "copy-externals",
        ["build-ts", "build-html", "build-sass", "copy-files"],
        callback
    );
});

gulp.task("build-ts", function () {
    return gulp.src(path.typescript)
        .pipe(changed(path.typescript, { extension: ".ts" }))
        .pipe(ts({
            module: "amd",
            sourceMap: true,
            emitError: false,
            target: "ES5",
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true
        }))
        .pipe(gulp.dest(path.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-html", function () {
    return gulp.src(path.views)
        .pipe(changed(path.views, { extension: ".html" }))
        .pipe(gulp.dest(path.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-sass", function() {
    var appSass = gulp.src([
            "app/shared/assets/css/main.scss",
            "app/welcome/assets/css/main.scss",
            "app/quick-recipe/assets/css/main.scss"
        ])
        .pipe(changed(path.sass, { extension: ".scss" }))
        .pipe(sass())

    var externals = gulp.src("app/**/*.css");

    return es.concat(appSass, externals)
        .pipe(concat("style.css"))
        .pipe(gulp.dest(path.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy-files", function() {
    return gulp.src("app/**/*.{json,png,jpg,svg,woff,woff2,ttf}")
        .pipe(gulp.dest(path.dest));
});

gulp.task("serve", ["build"], function (done) {
    browserSync.init({
        open: false,
        port: 9000,
        server: {
            baseDir: ["."],
            middleware: function (req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                next();
            }
        }
    }, done);
});

gulp.task("watch-ts", ["serve"], function () {
    gulp
        .watch([path.typescript], { interval: 3000 }, ["build-ts"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-html", ["serve"], function () {
    gulp
        .watch([path.views], { interval: 1000 }, ["build-html"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-sass", ["serve"], function () {
    gulp
        .watch([path.sass], { interval: 2000 }, ["build-sass"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch", ["watch-ts", "watch-html", "watch-sass"]);

gulp.task("clean-export", function() {
  return gulp.src([path.export])
    .pipe(vinylPaths(del));
});

gulp.task("bundle", ["unbundle"], function() {
    return bundler.bundle(bundleConfig);
});

gulp.task("unbundle", function() {
    return bundler.unbundle(bundleConfig);
});

gulp.task("minify-css", function() {
    return gulp.src("dist/app/style.css")
        .pipe(minifyCss());
});

gulp.task("images", function() {
    return gulp.src("dist/app/**/assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(path.dest));
});

function getBundles() {
  var bl = [];
  for (b in bundleConfig.bundles) {
    bl.push(b + ".js");
  }
  return bl;
}

gulp.task("export-copy", function() {
  return gulp.src([
        "index.html",
        "web.config",
        "config.js",
        "favicon.ico",
        "dist/app/style.css",
        "dist/app/**/*.+(json|png|jpg)",
        "dist/app/**/Material*.+(eot|svg|woff|woff2|ttf)",
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
        "jspm_packages/npm/aurelia-dialog@0.5.6/*.css",
        "jspm_packages/github/google/material-design-lite@**/**.js"
      ].concat(getBundles()), { base: "." })
    .pipe(gulp.dest(path.export))
});

gulp.task("export", function(callback) {
  return runSequence(
    ["clean", "clean-export"],
    "build",
    ["bundle", "minify-css", "images"],
    "export-copy",
    callback
  );
});
