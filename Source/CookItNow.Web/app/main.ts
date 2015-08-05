import {ConventionalViewStrategy} from "aurelia-templating";
 
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

	aurelia.globalizeResources("shared/aurelia-materialize");
    aurelia.start().then(a => a.setRoot());
}