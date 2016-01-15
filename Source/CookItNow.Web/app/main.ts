export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .globalResources("shared/aurelia-materialize")
	    .plugin("aurelia-animator-css")
	    .plugin("aurelia-dialog")
        .plugin("aurelia-i18n", (instance) => {
            instance.setup({
                resGetPath : "app/shared/assets/locale/__lng__/__ns__.json",
                lng : "fr",
                attributes : ["t","i18n"],
                getAsync : true,
                sendMissing : false,
                fallbackLng : "en",
                debug : false
            });
      });

    aurelia.start().then(a => a.setRoot());
}
