import {Router, RouterConfiguration} from "aurelia-router";

export class Home {
    private _router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "E133";
        config.map([
            { route: ["", "welcome"], name: "welcome", moduleId: "app/website/welcome/welcome", nav: true, title: "Welcome" },
            { route: "about", name: "about", moduleId: "app/website/about/about" }
        ]);

        this._router = router;
    }
}