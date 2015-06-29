/// <vs AfterBuild="vs-build-Debug" Clean="clean" />
var gulp = require("gulp");
var runSequence = require("run-sequence");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var bump = require("gulp-bump");
var browserSync = require("browser-sync").create();
var changed = require("gulp-changed");
var ts = require('gulp-tsc');
var less = require('gulp-less');

var path = {
    package: "./package.json", 
    html: "Views/**/*.html",
    typescript: 
    {
        src: "Scripts/**/*.ts",
        dest: "Scripts/",
        js: "Scripts/**/*.js"
    }, 
    less: {
        src: "Content/css/app/**/*.less",
        dest: "Content/css/app/",
        css: "Content/css/app/**/*.css"
    }
};

gulp.task("clean", function () {
    return gulp.src([path.typescript.js, path.less.css, "!Scripts/**/app-bundle.js"])
       .pipe(vinylPaths(del));
});

gulp.task('build-ts', function () {
    return gulp.src(path.typescript.src)
        .pipe(changed(path.typescript.src, { extension: ".ts" }))
        .pipe(ts({
            module: "amd",
            sourceMap: false, 
            emitError: false, 
            target: "ES5",
            emitDecoratorMetadata: true
        }))
        .pipe(gulp.dest(path.typescript.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-html", function () {
    return gulp.src(path.html)
        .pipe(changed(path.html, { extension: ".html" }))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-less", function() {
    return gulp.src(path.less.src)
        .pipe(changed(path.less.src, { extension: ".less" }))
        .pipe(less())
        .pipe(gulp.dest(path.less.dest))
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
      "clean",
      ["build-ts", "build-html", "build-less"],
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
        .watch([path.typescript.src], ["build-ts"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-html", ["serve"], function () {
    gulp
        .watch([path.html], ["build-html"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch-less", ["serve"], function () {
    gulp
        .watch([path.less.src], ["build-less"])
        .on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
});

gulp.task("watch", ["watch-ts", "watch-html", "watch-less"]);