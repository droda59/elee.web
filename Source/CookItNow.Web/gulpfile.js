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
var sass = require('gulp-sass');
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
    packagePath: ".",
    bundles: {
        "dist/app-bundle": {
            includes: [
                "**/*",
                "**/*.html!text",
                "**/*.css!text",
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "dist/aurelia-bundle": {
            includes: [
                "aurelia-bootstrapper",
                "aurelia-http-client",
                "aurelia-router",
                "aurelia-animator-css",
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                "aurelia-loader-default",
                "aurelia-history-browser",
                "aurelia-logging-console"
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("bundle", function() {
    return bundler.bundle(bundleConfig);
});

gulp.task("unbundle", function() {
    return bundler.unbundle(bundleConfig);
});

gulp.task("typedef", function () {
    return gulp.src("jspm_packages/github/aurelia/**/*.d.ts")
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("clean", function () {
    return gulp.src(["dist/*", "!dist/app-bundle.js", "!dist/aurelia-bundle.js"])
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
      .pipe(bump({ type: "patch" })) //major|minor|patch|prerelease
      .pipe(gulp.dest("./"));
});

gulp.task("default", ["build"]);
gulp.task("build", function (callback) {
    return runSequence(
      ["build-ts", "build-html", "build-sass"],
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