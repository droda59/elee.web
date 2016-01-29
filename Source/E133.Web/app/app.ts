import {Router} from "aurelia-router";

export class App {
	router:Router;

	constructor(router: Router) {
		this.router = router;
	}

	configureRouter(config, router: Router) {
		config.title = "E133";
		config.map([
			{ route: ["","welcome"],  moduleId: "welcome/welcome", nav: true, title:"Welcome" },
			{ route: "typeform",  name: "typeform", moduleId: "shared/components/typeform", nav: true, title:"Comments" },
			{ route: "recipe/:id", name: "quick-recipe", moduleId: "quick-recipe/quick-recipe-page" },
		]);
	}
}
