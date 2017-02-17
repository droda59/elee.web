import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class WelcomeAdministration {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }
}
