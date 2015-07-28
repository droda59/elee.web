import {Router} from "aurelia-router";

export class App {
	router:Router;

  configureRouter(config, router:Router){
    config.title = "Cook it now";
    config.map([
      { route: ["","welcome"],  moduleId: "./components/welcome/welcome", nav: true, title:"Welcome" },
      { route: "recipe/:id", name: "quick-recipe", moduleId: "./components/quick-recipe-page/quick-recipe-page" }, 
    ]);
    
    this.router = router;
  }
}
