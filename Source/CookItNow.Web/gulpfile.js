var gulp = require("gulp"),
    tsc = require("gulp-tsc"),
    less = require("gulp-less"), 
    shell = require("gulp-shell");
	
 var paths = {
    ts: {
        src: [
            "Scripts/app/*.ts"
        ],
        dest: "Scripts/app"
    },
    less: {
        src: [
            "Content/css/app/*.less"
        ], 
        dest: "Content/css/app"
    }
};

// Default
gulp.task("default", ["typescript", "less", "watch-less", "watch-ts"]);

// Build
gulp.task("build", ["typescript", "less"]);
	
// Typescript
gulp.task("typescript", function () {
    return gulp
        .src(paths.ts.src)
        .pipe(tsc({
            module: "CommonJS",
            sourcemap: true,
            emitError: false
        }))
        .pipe(gulp.dest(paths.ts.dest));
});

// Less
gulp.task("less", function () {
    return gulp
        .src(paths.less.src)
        .pipe(less())
        .pipe(gulp.dest(paths.less.dest));
});

gulp.task("watch-less", function () {
    gulp.watch(paths.less.src, ["less"]);
});

gulp.task("watch-ts", function () {
    gulp.watch(paths.ts.src, ["typescript"]);
});