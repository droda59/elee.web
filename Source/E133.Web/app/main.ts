import {MaterializeViewStrategy} from "shared/materialize-view-strategy";

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .globalResources("shared/aurelia-materialize")
	    .plugin("aurelia-animator-css")
	    .plugin("aurelia-dialog")
        .plugin("aurelia-validation", (config) => { config.useViewStrategy(MaterializeViewStrategy); })
        .plugin("aurelia-i18n", (instance) => {
            instance.setup({
                resGetPath : "dist/shared/assets/locale/__lng__/__ns__.json",
                lng : "fr",
                attributes : ["t","i18n"],
                getAsync : true,
                sendMissing : false,
                fallbackLng : "en",
                debug : false
            });
      });

    aurelia.start().then(a => a.setRoot());

    moment.relativeTimeThreshold("s", 60);
    moment.relativeTimeThreshold("m", 60);
    moment.relativeTimeThreshold("h", 24);
    moment.relativeTimeThreshold("d", 28);
    moment.relativeTimeThreshold("M", 12);
}
