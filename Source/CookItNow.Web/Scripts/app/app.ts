import {Router} from "aurelia-router";

export class App {
	router:Router;

  configureRouter(config, router:Router){
    config.title = "Cook it now";
    config.map([
      { route: ["","welcome"],  moduleId: "welcome",      nav: true, title:"Welcome" },
      { route: "form",  moduleId: "form",      nav: true, title:"Form" },
      { route: "flickr",        moduleId: "flickr",       nav: true },
      { route: "child-router",  moduleId: "child-router", nav: true, title:"Child Router" },
      { route: "recipe/:id", name: "quick-recipe", moduleId: "quick-recipe-page" }, 
      // { route: "quick-recipe-page",  moduleId: "quick-recipe-page", nav: true, title:"Quick recipe" }
    ]);

    this.router = router;
  }
}
