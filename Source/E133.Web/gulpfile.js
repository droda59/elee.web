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

var path = {
    package: "./package.json",
    views:
    {
        src: "app/**/*.html",
        dest: "dist/"
    },
    typescript:
    {
        src: "app/**/*.ts",
        dest: "dist/"
    },
    sass: {
        src: "app/**/*.scss",
        dest: "dist/"
    },
    externals: {
        dest: "externals/"
    },
    export: {
        dest: "export/"
    }
};

var bundleConfig = {
    force: true,
    baseURL: ".",                   // `baseURL of the application`
    configPath: "./config.js",      // `config.js` path. Must be within `baseURL`
    bundles: {
        "dist/app-bundle": {
            includes: [
                "[**/*.js]"
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
                "scrollmagic"
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("bundle", ["unbundle", "build"], function() {
    return bundler.bundle(bundleConfig);
});

gulp.task("unbundle", function() {
    return bundler.unbundle(bundleConfig);
});

gulp.task("typedef", function () {
    return gulp.src("jspm_packages/npm/aurelia*/**/*.d.ts")
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("copy-files", function() {
    return gulp.src("app/**/*.{json,png,jpg,svg,woff,woff2,ttf}")
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean-dependencies", function() {
  return gulp.src([path.externals.dest])
    .pipe(vinylPaths(del));
});

gulp.task("copy-dependencies-jquery", function () {
  return gulp.src([
        "jspm_packages/github/components/jquery@*/jquery.min.js"
    ])
    .pipe(flatten())
    .pipe(gulp.dest(path.externals.dest + "jquery/"));
});

gulp.task("copy-dependencies-materialize-css", function (callback) {
  return gulp.src([
        "jspm_packages/npm/materialize-css@**/bin/materialize.css",
        "jspm_packages/npm/materialize-css@**/bin/materialize.js"])
    .pipe(flatten())
    .pipe(gulp.dest(path.externals.dest + "materialize-css"));
});

gulp.task("copy-dependencies-moment", function () {
  return gulp.src([
        "jspm_packages/npm/moment@**/moment.js",
        "jspm_packages/npm/moment@**/locale/fr.js"
    ])
    .pipe(flatten())
    .pipe(gulp.dest(path.externals.dest + "moment/"));
});

gulp.task("copy-dependencies-system", function () {
  return gulp.src([
        "jspm_packages/system.js",
        "jspm_packages/system.js.map",
        "jspm_packages/system-polyfills.js",
        "jspm_packages/system-csp-production.js"
    ])
    .pipe(gulp.dest(path.externals.dest + "system/"));
});

gulp.task("copy-dependencies", function (callback) {
    return runSequence(
        "clean-dependencies",
        "copy-dependencies-jquery",
        "copy-dependencies-materialize-css",
        "copy-dependencies-moment",
        "copy-dependencies-system",
        callback
    );
});

gulp.task("images", function() {
    return gulp.src("dist/**/assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean", function () {
    return gulp.src([path.views.dest, path.externals.dest])
       .pipe(vinylPaths(del));
});

gulp.task("build-ts", function () {
    return gulp.src(path.typescript.src)
        .pipe(changed(path.typescript.src, { extension: ".ts" }))
        .pipe(ts({
            module: "amd",
            sourceMap: false,
            emitError: false,
            target: "ES5",
            emitDecoratorMetadata: true,
            experimentalDecorators : true
        }))
        .pipe(gulp.dest(path.typescript.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-html", function () {
    return gulp.src(path.views.src)
        .pipe(changed(path.views.src, { extension: ".html" }))
        .pipe(gulp.dest(path.views.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-sass", function() {
    return gulp.src(path.sass.src)
        .pipe(changed(path.sass.src, { extension: ".scss" }))
        .pipe(sass())
        .pipe(concat("style.css"))
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("minify-css", function() {
    return gulp.src("dist/style.css")
        .pipe(minifyCss());
});

gulp.task("bump-version", function () {
    return gulp.src(path.package)
      .pipe(bump({ type: "patch" })) //major|minor|patch|prerelease, e.g. "major.minor.patch-prerelease"
      .pipe(gulp.dest("./"));
});

gulp.task("default", ["build"]);
gulp.task("build", function (callback) {
    return runSequence(
      ["build-ts", "build-html", "build-sass", "copy-files", "copy-dependencies"],
      "images",
      callback
    );
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
        .watch([path.typescript.src], { interval: 3000 }, ["build-ts"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-html", ["serve"], function () {
    gulp
        .watch([path.views.src], { interval: 1000 }, ["build-html"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-sass", ["serve"], function () {
    gulp
        .watch([path.sass.src], { interval: 2000 }, ["build-sass"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch", ["watch-ts", "watch-html", "watch-sass"]);

gulp.task("clean-export", function() {
  return gulp.src([path.export.dest])
    .pipe(vinylPaths(del));
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
        "config.js",
        "favicon.ico",
        "dist/**/*.+(html|css|json|png|jpg|svg|woff|woff2|ttf)",
        "externals/**/*",
        "jspm_packages/github/systemjs/plugin-text@*.js",
        "jspm_packages/github/systemjs/plugin-text@*/text.js",
        "jspm_packages/npm/aurelia-dialog@**/*.html",
        "jspm_packages/npm/aurelia-dialog@**/*.css",
        "jspm_packages/github/andyearnshaw/Intl.js@*.js",
        "jspm_packages/github/andyearnshaw/Intl.js@*/Intl.complete.js"
      ].concat(getBundles()), { base: "." })
    .pipe(gulp.dest(path.export.dest))
});

gulp.task("export", function(callback) {
  return runSequence(
    "clean",
    "bundle",
    "clean-export",
    "minify-css",
    "export-copy",
    callback
  );
});
