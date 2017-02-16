import { inject } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { Configure } from "aurelia-configuration";
import { I18N } from "aurelia-i18n";
import { CustomValidationMessages } from "app/shared/custom-validation-messages";

@inject(I18N, Configure, CustomValidationMessages)
export class Main {
	router: Router;

	constructor(private _i18n: I18N,
				private _configuration: Configure) { }

    configureRouter(config: RouterConfiguration, router: Router) {
        let routes = [
            {
                route: ["", "welcome"],
                moduleId: "app/website/welcome/welcome",
                title: this._i18n.tr("home.pageTitle"),
                nav: true,
            },
            {
                route: "how-it-works",
                name: "how-it-works",
                moduleId: "app/website/how-it-works/how-it-works",
                title: this._i18n.tr("how-it-works.pageTitle"),
                nav: true,
            },
            {
                route: "about",
                name: "about",
                moduleId: "app/website/about/about",
                title: this._i18n.tr("about.pageTitle"),
                nav: true,
            },
            {
                route: "contact",
                name: "contact",
                moduleId: "app/website/contact/contact",
                title: this._i18n.tr("contact.pageTitle"),
                nav: true,
            },
            {
                route: "recipe/:uniqueName",
                name: "quick-recipe",
                moduleId: "app/quick-recipe/index"
            }
        ];

		config.title = "elee.menu";
		config.map(routes);

		this.router = router;
	}
}
