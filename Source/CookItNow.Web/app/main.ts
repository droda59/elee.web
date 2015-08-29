import {I18N} from "aurelia-i18next";
import {ConventionalViewStrategy} from "aurelia-templating";
 
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
	    .plugin("aurelia-animator-css");
        // .plugin("aurelia-i18next", (instance) => {
        //     instance.setup({
        //         resGetPath : "locale/__lng__/__ns__.json",
        //         lng : "fr",
        //         attributes : ["t","i18n"],
        //         getAsync : true,
        //         sendMissing : false,
        //         fallbackLng : "en",
        //         debug : false
        //     });
      // });

	aurelia.globalizeResources("shared/aurelia-materialize");
    aurelia.start().then(a => a.setRoot());
}