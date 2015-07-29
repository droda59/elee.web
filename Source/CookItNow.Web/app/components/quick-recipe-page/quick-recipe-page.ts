import {CssAnimator} from 'aurelia-animator-css';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
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

@inject (HttpClient, EventAggregator, CssAnimator)
export class QuickRecipePage {
    private _http: HttpClient;
	private _animator: CssAnimator;
	private _eventAggregator: EventAggregator;
	
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	
	constructor(http: HttpClient, eventAggregator: EventAggregator, animator: CssAnimator) {
		this._http = http;
		this._animator = animator;
		this._eventAggregator = eventAggregator;
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
			
			// TODO Ugly-ass code; maybe it can be done server-side, we don't need that shit here
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
		var that = this;
		this._eventAggregator.subscribe("STEPCOMPLETED", element => {
			that._animator.removeClass(element, "current-step");
			that._animator.addClass(element, "previous-step");
			that._animator.animate(element, "current-step-animation");
			
			// TODO Find those more intelligently: currently they just search for other phrases in step
			var previous = element.previousElementSibling;
			if (previous) {
				that._animator.removeClass(previous, "previous-step");
				that._animator.addClass(previous, "previousest-step");
			}
			
			var newCurrent = element.nextElementSibling;
			if (newCurrent) {
				that._animator.removeClass(newCurrent, "next-step");
				that._animator.addClass(newCurrent, "current-step");
				
				var next = newCurrent.nextElementSibling;
				if (next) {
					that._animator.removeClass(next, "nextest-step");
					that._animator.addClass(next, "next-step");
					
					var nextest = next.nextElementSibling;
					if (nextest) {
						that._animator.addClass(nextest, "nextest-step");
					}
				}
			}
		});
    }

	canDeactivate(){
		return confirm('Are you sure you want to leave?');
	}
}