import {QuickRecipe, Ingredient, Step} from "models/quick-recipe";
import {Timer} from "models/timer";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

class QuickRecipeSubrecipeStep {
	subrecipeTitle: string;
	steps: Step[];
}

@inject (HttpClient, EventAggregator)
export class QuickRecipePage {
    private _http: HttpClient;
	private _eventAggregator: EventAggregator;
    private _url: string;
    recipe: QuickRecipe;
	minimized: boolean = false;
	activeTimers: Timer[] = [];
	timers: Timer[] = [];
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	
	constructor(http: HttpClient, eventAggregator: EventAggregator) {
		this._http = http;
		this._eventAggregator = eventAggregator;
	}
	
	activate(route) {
		switch (route.id) {
			case "1":
				this._url = "../../Json/recipeModel-pouding.json";
				break;
			case "2": 
				this._url = "../../Json/recipeModel-gaufres.json";
				break;
			default:
				break;
		}
		
        return this._http.get(this._url).then(response => {
            this.recipe = response.content;
			
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
    
    attached() {
		this._eventAggregator.subscribe("TIMERSTARTED", payload => {
			if (this.activeTimers.indexOf(payload) === -1) {
				this.activeTimers.push(payload);
			}
		});
		
		this._eventAggregator.subscribe("TIMERDELETED", payload => {
			var index = this.activeTimers.indexOf(payload);
			this.activeTimers.splice(index, 1);
		});
    }

	canDeactivate(){
		return confirm('Are you sure you want to leave?');
	}
	
	startTimer(timer: Timer) {
		this.activeTimers.push(timer);
	}
	
	toggleMinimizeActiveTimers() {
		this.minimized = !this.minimized; 
	}
}