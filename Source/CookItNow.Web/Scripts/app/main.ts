import {ConventionalViewStrategy} from "aurelia-templating";
import {Materialize} from "resources/materialize"; // ensure the materialize jquery plugins are installed.
 
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('./resources/index');
 
    ConventionalViewStrategy.convertModuleIdToViewUrl = function(moduleId){
        var moduleName = moduleId.replace("Scripts/app/", "");
        return `./Views/${moduleName}.html`;
    }
 
    aurelia.start().then(a => a.setRoot());
}