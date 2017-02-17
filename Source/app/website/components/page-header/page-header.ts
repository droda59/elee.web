import { Router } from "aurelia-router";
import { autoinject, containerless } from "aurelia-framework";

@autoinject()
@containerless()
export class PageHeader {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	isHomepage(): boolean {
		// Homepage is the only home not having a name specified.
		return this.router.currentInstruction.config.name === undefined;
	}
}
