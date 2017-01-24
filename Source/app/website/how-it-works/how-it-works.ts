import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";

@autoinject()
export class HowItWorks {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	getCurrentPageName(): string {
		return this.router.currentInstruction.config.name;
	}
}
