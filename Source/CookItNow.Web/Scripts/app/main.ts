/// <reference path="../typings/aurelia/aurelia-framework.d.ts"/>

import {ConventionalViewStrategy} from "aurelia-framework";
 
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