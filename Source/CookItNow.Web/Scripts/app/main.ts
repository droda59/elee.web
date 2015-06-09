import {ConventionalViewStrategy} from "aurelia-templating";
 
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
 
    ConventionalViewStrategy.convertModuleIdToViewUrl = function(moduleId){
        var moduleName = moduleId.replace("Scripts/app/", "");
        return `./Views/${moduleName}.html`;
    }
 
    aurelia.start().then(a => a.setRoot());
}