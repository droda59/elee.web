import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";

@inject (Router)
export class Welcome {
	private router: Router;
	selectedRecipeId: string;
	recipes: {}[] = [];
	
	constructor(router: Router) {
		this.router = router;
		
		this.recipes.push({ id: "1", title: "Pouding au chocolat" });
		this.recipes.push({ id: "2", title: "Gaufres" });
	}
	
	loadRecipe() {
		this.router.navigateToRoute("quick-recipe", { "id": this.selectedRecipeId });
	}
}