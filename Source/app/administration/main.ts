import { autoinject, inlineView } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { I18N } from "aurelia-i18n";

@autoinject()
@inlineView("<template><router-view></router-view></template>")
export class Administration {
    router: Router;

    private _i18n: I18N;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        let routes = [
            {
        		route: "",
        		name: "admin",
        		moduleId: "app/administration/welcome/index"
        	},
            {
        		route: "contact",
        		name: "admin-contact",
        		moduleId: "app/administration/contact/index",
        		title: this._i18n.tr("administration.contact.pageTitle"),
                nav: true
        	},
            {
        		route: "backgrounds",
        		name: "admin-backgrounds",
        		moduleId: "app/administration/backgrounds/index",
        		title: this._i18n.tr("administration.backgrounds.pageTitle"),
                nav: true
        	},
            {
        		route: "recipes",
        		name: "admin-recipes",
        		moduleId: "app/administration/recipes/index",
        		title: this._i18n.tr("administration.recipes.pageTitle"),
                nav: true
        	},
            {
        		route: "recipe/:uniqueName/edit",
        		name: "edit",
        		moduleId: "app/administration/edit-recipe/index"
        	}
        ];

		config.map(routes);

		this.router = router;
    }
}
