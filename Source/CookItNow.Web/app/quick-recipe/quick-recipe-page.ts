import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {QuickRecipe, Step} from "quick-recipe/models/quick-recipe";
import {Ingredient} from "shared/models/ingredient";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

class QuickRecipeSubrecipeStep {
	subrecipeTitle: string;
	steps: Step[];
}

@inject (HttpClient, Element)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	element: Element;
	backgroundClass: string;
	
    private _http: HttpClient;
	
	constructor(http: HttpClient, element: Element) {
		this._http = http;
		this.element = element;
	}
	
	activate(route, routeConfig) {
		var url;
		switch (route.id) {
			case "1":
				url = "app/quick-recipe/assets/json/recipeModel-pouding.json";
				break;
			case "2": 
				url = "app/quick-recipe/assets/json/recipeModel-gaufres.json";
				break;
			case "3": 
				url = "app/quick-recipe/assets/json/recipeModel-chevre.json";
				break;
			default:
				break;
		}
		
		// TODO Ugly-ass code; used to decide randomly which background to pick. this should go somewhere else
		var backgroundId = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		switch (backgroundId) {
			case 1:
				this.backgroundClass = "chalkboard";
				break;
			case 2: 
				this.backgroundClass = "wood";
				break;
			default:
				this.backgroundClass = "stone";
				break;
		}
		
        return this._http.get(url).then(response => {
            this.recipe = response.content;
			
			routeConfig.navModel.title = this.recipe.title;
			
			// TODO Ugly-ass code; maybe it can be done server-side, we don't need that shit here
			var floatingIngredients = this.recipe.ingredients.filter(
				(ingredient) => ingredient.subrecipeId === undefined || ingredient.subrecipeId < 0
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
				(step) => step.subrecipeId === undefined || step.subrecipeId < 0
			);
			if (floatingSteps.length) {
				var subrecipeStep = new QuickRecipeSubrecipeStep();
				subrecipeStep.steps = floatingSteps;
				this.subrecipeSteps.push(subrecipeStep);
			}
			
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

	canDeactivate() {
		return confirm('Are you sure you want to leave?');
	}
}