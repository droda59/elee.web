import {Router, RouterConfiguration} from "aurelia-router";

export class Home {
    private _router: Router;
    private _element: Element;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "HomeRouter";
        config.map([
            { route: ["", "welcome"], name: "home", moduleId: "app/website/welcome/welcome", nav: true, title: "Welcome" },
            { route: "about", name: "about", moduleId: "app/website/about/about" }
        ]);

        this._router = router;
    }
}