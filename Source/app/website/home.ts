import {Router, RouterConfiguration} from "aurelia-router";

export class Home {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "E133";
        config.map([
            { route: ["","welcome"], name: "home" ,moduleId: "app/website/welcome/welcome", nav: true, title: "Welcome" },
            { route: "about", name: "about", moduleId: "app/website/about/about" }
        ]);

        this.router = router;
    }
}