import {Router} from "aurelia-router";

export class App {
	router:Router;

	constructor(router: Router) {
		this.router = router;
	}

	configureRouter(config, router: Router) {
		config.title = "Cook it now";
		config.map([
			{ route: ["","welcome"],  moduleId: "welcome/welcome", nav: true, title:"Welcome" },
			{ route: "comments",  name: "comments", moduleId: "shared/typeform", nav: true, title:"Comments" },
			{ route: "recipe/:id", name: "quick-recipe", moduleId: "quick-recipe/quick-recipe-page" },
		]);
	}
}
