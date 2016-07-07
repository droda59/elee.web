import {Router, RouterConfiguration} from "aurelia-router";

export class Main {
	router: Router;

	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = "E133";
		config.map([
			{ route: ["", "home"], name: "home", moduleId: "app/website/home", nav: true, title: "Website Home" },
			{ route: "typeform", name: "typeform", moduleId: "app/shared/components/typeform", nav: true, title: "Comments" },
			{ route: "recipe/:id", name: "quick-recipe", moduleId: "app/quick-recipe/quick-recipe-page" }
		]);

		this.router = router;
	}
}
