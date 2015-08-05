/// <vs AfterBuild="vs-build-Debug" Clean="clean" />
var gulp = require("gulp");
var runSequence = require("run-sequence");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var flatten = require("gulp-flatten");
var bump = require("gulp-bump");
var browserSync = require("browser-sync").create();
var changed = require("gulp-changed");
var ts = require('gulp-tsc');
var less = require('gulp-less');

var path = {
    package: "./package.json", 
    html: 
    {
        src: "app/**/*.html",
        dest: "dist/",
        html: "dist/**/*.html"
    },
    typescript: 
    {
        src: "app/**/*.ts",
        dest: "dist/",
        js: "dist/**/*.js"
    }, 
    less: {
        src: "app/**/*.less",
        dest: "dist/",
        css: "dist/**/*.css"
    }
};

gulp.task("typedef", function () {
    return gulp.src("jspm_packages/github/aurelia/**/*.d.ts")
        .pipe(flatten())
        .pipe(gulp.dest("typings/aurelia"));
});

gulp.task("clean", function () {
    return gulp.src([path.typescript.js, path.less.css, path.html.html, "!dist/app-bundle.js"])
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
            emitDecoratorMetadata: true,
            experimentalDecorators : true
        }))
        .pipe(gulp.dest(path.typescript.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build-html", function () {
    return gulp.src(path.html.src)
        .pipe(changed(path.html.src, { extension: ".html" }))
        .pipe(gulp.dest(path.html.dest))
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