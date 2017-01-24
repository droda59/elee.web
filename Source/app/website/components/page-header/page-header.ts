import { Router } from "aurelia-router";
import { autoinject, containerless } from "aurelia-framework";
import { Configure } from "aurelia-configuration";
import { I18N } from "aurelia-i18n";

@autoinject()
@containerless()
export class PageHeader {
	router: Router;
	isAdmin: boolean;

	constructor(private _i18n: I18N,
				configuration: Configure,
				router: Router) {
		this.router = router;
		this.isAdmin = configuration.is("development");
	}

	isHomepage(): boolean {
		// Homepage is the only home not having a name specified.
		return this.router.currentInstruction.config.name === undefined;
	}
}
