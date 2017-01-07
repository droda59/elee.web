import {autoinject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {Configure} from "aurelia-configuration";
import {I18N} from "aurelia-i18n";

@autoinject()
export class Main {
    router: Router;

    private _i18n: I18N;
    private _configuration: Configure;

    constructor(i18n: I18N, configuration: Configure) {
        this._i18n = i18n;
        this._configuration = configuration;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        let routes = [
            {
                route: ["", "home"],
                moduleId: "app/website/home",
                nav: false
            },
            {
                route: "typeform",
                name: "typeform",
                moduleId: "app/shared/components/typeform",
                nav: true,
                title: this._i18n.tr("comments.pageTitle")
            },
            {
                route: "about/",
                name: "about",
                moduleId: "app/website/about/about"
            },
            {
                route: "recipe/:uniqueName",
                name: "quick-recipe",
                moduleId: "app/quick-recipe/follow-recipe/index"
            }
        ];

        if (this._configuration.is("development")) {
            routes.push({
                route: "administration/recipes",
                name: "administration",
                moduleId: "app/quick-recipe/administration/index",
                title: this._i18n.tr("administration.pageTitle")
            });

            routes.push({
                route: "administration/backgrounds",
                name: "backgrounds",
                moduleId: "app/quick-recipe/backgrounds/index",
                title: this._i18n.tr("backgrounds.pageTitle")
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
