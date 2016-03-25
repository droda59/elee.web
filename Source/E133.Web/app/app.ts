import {Router, RouterConfiguration} from "aurelia-router";

export class App {
	router:Router;

	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = "E133";
		config.map([
			{ route: ["","welcome"],  moduleId: "welcome/welcome", nav: true, title:"Welcome" },
			{ route: "typeform",  name: "typeform", moduleId: "shared/components/typeform", nav: true, title:"Comments" },
			{ route: "recipe/:id", name: "quick-recipe", moduleId: "quick-recipe/quick-recipe-page" },
		]);

		this.router = router;
	}
}
