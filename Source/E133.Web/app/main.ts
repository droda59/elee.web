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
          })
        .plugin('aurelia-google-analytics', config => {
            config.init('UA-73519104-1');
            config.attach({
                logging: {
                    enabled: true
                },
                pageTracking: {
                    enabled: true
                },
                clickTracking: {
                    enabled: true,
                    filter: (element) => {
                        return element instanceof HTMLElement &&
                            (element.nodeName.toLowerCase() === 'a' ||
                            element.nodeName.toLowerCase() === 'button');
                    }
                }
            });
        });

    aurelia.start().then(a => a.setRoot());

    moment.relativeTimeThreshold("s", 60);
    moment.relativeTimeThreshold("m", 60);
    moment.relativeTimeThreshold("h", 24);
    moment.relativeTimeThreshold("d", 28);
    moment.relativeTimeThreshold("M", 12);

    if (!String.format) {
        String.format = function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        }
    }
}
