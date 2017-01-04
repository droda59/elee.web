import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";

@autoinject()
export class PageHeader {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    attached() {
        $(".button-collapse").sideNav({
            edge: "left"
        });
    }
}
