import {autoinject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {Configure} from "aurelia-configuration";
import {I18N} from "aurelia-i18n";

@autoinject()
export class Main {
    router: Router;

    constructor(private i18n: I18N,
				private configuration: Configure) { }

    configureRouter(config: RouterConfiguration, router: Router) {
        let routes = [
            {
                route: ["", "home"],
                moduleId: "app/website/home",
                nav: false
            },
            {
                route: "recipe/:uniqueName",
                name: "quick-recipe",
                moduleId: "app/quick-recipe/follow-recipe/index"
            }
        ];

        if (this.configuration.is("development")) {
            routes.push({
                route: "administration/recipes",
                name: "administration",
                moduleId: "app/quick-recipe/administration/index",
                title: this.i18n.tr("administration.pageTitle")
            });

            routes.push({
                route: "administration/backgrounds",
                name: "backgrounds",
                moduleId: "app/quick-recipe/backgrounds/index",
                title: this.i18n.tr("backgrounds.pageTitle")
            });

            routes.push({
                route: "recipe/:uniqueName/edit",
                name: "edit",
                moduleId: "app/quick-recipe/edit-recipe/index"
            });
        }

        config.title = "elee.menu";
        config.map(routes);

        this.router = router;
    }
}
