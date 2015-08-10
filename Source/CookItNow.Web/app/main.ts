import {ConventionalViewStrategy} from "aurelia-templating";
 
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
	    .plugin('aurelia-animator-css');;

	aurelia.globalizeResources("shared/aurelia-materialize");
    aurelia.start().then(a => a.setRoot());
}