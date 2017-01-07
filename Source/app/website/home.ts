import { autoinject } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { I18N } from "aurelia-i18n";

@autoinject
export class Home {
	router: Router;
	isHomepage: boolean;

	constructor(private _i18n: I18N) { }

	configureRouter(config: RouterConfiguration, router: Router) {
		config.map([
			{
				route: ["", "welcome"],
				name: "welcome",
				moduleId: "app/website/welcome/welcome",
				nav: true,
				title: this._i18n.tr("home.pageTitle")
			},
			{
				route: "contact",
				name: "contact",
				moduleId: "app/website/contact/contact",
				nav: true,
				href: "#/home/contact/",
				title: this._i18n.tr("contact.pageTitle")
			}
		]);

		this.router = router;
	}

	getCurrentPageName(): string {
		return this.router.currentInstruction.config.name;
	}
}
