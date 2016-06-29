var appRoot = "app/";
var outputRoot = "dist/";
var exportRoot = "export/";

module.exports = {
    views: appRoot + "**/*.html",
    sources: appRoot + "**/*.ts",
    styles: appRoot + "**/*.scss",
    outputApp: outputRoot + appRoot,
    export: exportRoot,
    output: outputRoot,
    app: appRoot
};
