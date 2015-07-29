import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {QuickRecipe, Ingredient, Step} from "models/quick-recipe";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

class QuickRecipeSubrecipeStep {
	subrecipeTitle: string;
	steps: Step[];
}

@inject (HttpClient)
export class QuickRecipePage {
    private _http: HttpClient;
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	
	constructor(http: HttpClient) {
		this._http = http;
	}
	
	activate(route, routeConfig) {
		var url;
		switch (route.id) {
			case "1":
				url = "../assets/json/recipeModel-pouding.json";
				break;
			case "2": 
				url = "../assets/json/recipeModel-gaufres.json";
				break;
			default:
				break;
		}
		
        return this._http.get(url).then(response => {
            this.recipe = response.content;
			
			routeConfig.navModel.title = this.recipe.title;
			
			var floatingIngredients = this.recipe.ingredients.filter(
				(ingredient) => !ingredient.subrecipeId || ingredient.subrecipeId === 0
			);
			if (floatingIngredients.length) {
				var subrecipeIngredient = new QuickRecipeSubrecipeIngredient();
				subrecipeIngredient.ingredients = floatingIngredients;
				this.subrecipeIngredients.push(subrecipeIngredient);
			}
			
			(this.recipe.subrecipes || []).forEach(
				(subrecipe) => {
					var subrecipeIngredient = new QuickRecipeSubrecipeIngredient();
					subrecipeIngredient.subrecipeTitle = subrecipe.title;
					subrecipeIngredient.ingredients = this.recipe.ingredients.filter(
						(ingredient) => ingredient.subrecipeId === subrecipe.id
					);
					 
					this.subrecipeIngredients.push(subrecipeIngredient);
				} 
			);
			
			var floatingSteps = this.recipe.steps.filter(
				(step) => !step.subrecipeId || step.subrecipeId === 0
			);
			var subrecipeStep = new QuickRecipeSubrecipeStep();
			subrecipeStep.steps = floatingSteps;
			this.subrecipeSteps.push(subrecipeStep);
			
			(this.recipe.subrecipes || []).forEach(
				(subrecipe) => {
					var subrecipeStep = new QuickRecipeSubrecipeStep();
					subrecipeStep.subrecipeTitle = subrecipe.title;
					subrecipeStep.steps = this.recipe.steps.filter(
						(step) => step.subrecipeId === subrecipe.id
					);
					 
					this.subrecipeSteps.push(subrecipeStep);
				} 
			);
        });
	}

	canDeactivate(){
		return confirm('Are you sure you want to leave?');
	}
}