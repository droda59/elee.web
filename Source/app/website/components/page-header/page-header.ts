import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { Configure } from "aurelia-configuration";
import { I18N } from "aurelia-i18n";

@autoinject()
export class PageHeader {
	router: Router;

	constructor(private _configuration: Configure,
				private _i18n: I18N,
				router: Router) {
		this.router = router;
	}

	isAdmin(): boolean {
		return this._configuration.is("development");
	}

	isHomepage(): boolean {
		// Homepage is the only home not having a name specified.
		return this.router.currentInstruction.config.name === undefined;
	}
}
