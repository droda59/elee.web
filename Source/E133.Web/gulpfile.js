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
    }
};

var bundleConfig = {
    force: true,
    baseURL: ".",                   // `baseURL of the application`
    configPath: "./config.js",      // `config.js` path. Must be within `baseURL`
    bundles: {
        "dist/app-bundle": {
            includes: [
                "[**/*.js]",
                "[**/*.html!text]",
                "[**/*.css!text]",
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
                "aurelia-validation/resources/*"
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

gulp.task("copyfiles", function() {
    return gulp.src("app/**/*.{json,png,jpg,svg,wof,ttf}")
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean", function () {
    return gulp.src("dist/")
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
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("bump-version", function () {
    return gulp.src(path.package)
      .pipe(bump({ type: "major" })) //major|minor|patch|prerelease
      .pipe(gulp.dest("./"));
});

gulp.task("default", ["build"]);
gulp.task("build", function (callback) {
    return runSequence(
      ["build-ts", "build-html", "build-sass", "copyfiles"],
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
  return gulp.src(["export/"])
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
        "dist/**/*.json",
        "dist/**/*.png",
        "dist/**/*.jpg",
        "dist/**/*.svg",
        "dist/**/*.wof",
        "dist/**/*.ttf",
        "jspm_packages/system.js",
        "jspm_packages/system-polyfills.js",
        "jspm_packages/system-csp-production.js",
        "jspm_packages/npm/gsap@1.18.2/src/minified/TweenMax.min.js",
        "jspm_packages/npm/gsap@1.18.2/src/minified/plugins/ScrollToPlugin.min.js",
        "jspm_packages/npm/scrollmagic@2.0.5/minified/ScrollMagic.min.js",
        "jspm_packages/npm/scrollmagic@2.0.5/minified/plugins/animation.gsap.min.js",
        "jspm_packages/npm/materialize-css@0.97.5/bin/*",
        "jspm_packages/npm/moment@2.11.1/moment.js",
        "jspm_packages/npm/moment@2.11.1/locale/fr.js",
        "jspm_packages/npm/aurelia-validation@0.6.0/resources/en-US.js",
        "jspm_packages/github/components/jquery@2.2.0/jquery.js"
      ].concat(getBundles()), { base: "." })
    .pipe(gulp.dest("export/"));
});

gulp.task("export", function(callback) {
  return runSequence(
    "clean",
    "bundle",
    "clean-export",
    "export-copy",
    callback
  );
});
