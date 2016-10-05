import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {I18N} from "aurelia-i18n";

@inject(I18N)
export class Main {
    router: Router;
    private _i18n: I18N;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "E133";
        config.map([
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
            route: "administration",
            name: "administration",
            moduleId: "app/quick-recipe/administration/index",
            title: this._i18n.tr("administration.pageTitle")
        },
        {
            route: "recipe/:id",
            name: "quick-recipe",
            moduleId: "app/quick-recipe/quick-recipe-page"
        },
        {
            route: "recipe/:id/edit",
            name: "edit",
            moduleId: "app/quick-recipe/edit-recipe/index"
        }
        ]);

        this.router = router;
    }
}
