import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";
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

@inject (HttpClient, EventAggregator, Element)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	element: Element;
	backgroundClass: string;
	
    private _http: HttpClient;
	private _eventAggregator: EventAggregator;
	
	constructor(http: HttpClient, eventAggregator: EventAggregator, element: Element) {
		this._http = http;
		this._eventAggregator = eventAggregator;
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
			
			(this.recipe.subrecipes || []).forEach(
				(subrecipe) => {
					var subrecipeIngredient = new QuickRecipeSubrecipeIngredient();
					subrecipeIngredient.subrecipeTitle = subrecipe.title;
					subrecipeIngredient.ingredients = this.recipe.ingredients.filter(
						(ingredient) => ingredient.subrecipeId === subrecipe.id
					);
					 
					if (subrecipeIngredient.ingredients.length) {
						this.subrecipeIngredients.push(subrecipeIngredient);
					}
				} 
			);
			
			(this.recipe.subrecipes || []).forEach(
				(subrecipe) => {
					var subrecipeStep = new QuickRecipeSubrecipeStep();
					subrecipeStep.subrecipeTitle = subrecipe.title;
					subrecipeStep.steps = this.recipe.steps.filter(
						(step) => step.subrecipeId === subrecipe.id
					);
					 
					if (subrecipeStep.steps.length) {
						this.subrecipeSteps.push(subrecipeStep);
					}
				} 
			);
        });
	}

	canDeactivate() {
		return confirm('Are you sure you want to leave?');
	}
	
	backStep() {
		this._eventAggregator.publish("STEPRETURNED");
	}
	
	nextStep() {
        this._eventAggregator.publish("STEPCOMPLETED");
	}
}