import {CssAnimator} from 'aurelia-animator-css';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {HttpClient} from "aurelia-http-client";
import {QuickRecipe, Ingredient, Step} from "models/quick-recipe";
import $ from "jquery";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

class QuickRecipeSubrecipeStep {
	subrecipeTitle: string;
	steps: Step[];
}

@inject (HttpClient, EventAggregator, CssAnimator, Element)
export class QuickRecipePage {
    private _http: HttpClient;
	private _animator: CssAnimator;
	private _eventAggregator: EventAggregator;
	private _element: Element;
	
	private _previousestStep: Element;
	private _previousStep: Element;
	private _currentStep: Element;
	private _nextStep: Element;
	private _nextestStep: Element;
	
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	subrecipeSteps: QuickRecipeSubrecipeStep[] = [];
	
	constructor(http: HttpClient, eventAggregator: EventAggregator, animator: CssAnimator, element: Element) {
		this._http = http;
		this._animator = animator;
		this._eventAggregator = eventAggregator;
		this._element = element;
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
	
    attached() {
		var that = this;
		this._eventAggregator.subscribe("STEPCOMPLETED", element => this.completeStep(element));
			
		this.currentStep = this.findFirstStep(this._element);
		this.nextStep = this.findNextStep(this._currentStep);
		this.nextestStep = this.findNextStep(this._nextStep);
    }

	canDeactivate() {
		return confirm('Are you sure you want to leave?');
	}
	
	private completeStep(element: Element): void {
		if (this._previousStep) {
			this._animator.removeClass(this._previousStep, "previous-step")
				.then(this.previousestStep = this._previousStep);
		}
		
		this._animator.removeClass(element, "current-step")
			.then(this.previousStep = element);
		
		var newCurrent = this._nextStep || this.findNextStep(element); 
		if (newCurrent) {
			this._animator.removeClass(newCurrent, "next-step")
				.then(this.currentStep = newCurrent);
			
			var next = this._nextestStep || this.findNextStep(newCurrent); 
			if (next) {
				this._animator.removeClass(next, "nextest-step")
					.then(this.nextStep = next);
				
				var nextest = this.findNextStep(next); 
				if (nextest) {
					this.nextestStep = nextest;
				}
			}
		}
	}
	
	private findFirstStep(element: Element): Element	{
		var firstStep = $(element).find(".phrase:first-of-type")[0];
		
		return firstStep;
	}
	
	private findNextStep(element: Element): Element {
		var nextPhrase = element.nextElementSibling;
		if (nextPhrase && nextPhrase.classList.contains("phrase")) {
			return nextPhrase; 
		}
		else if (nextPhrase && nextPhrase.classList.contains("postStep")) {
			return this.findFirstStep(nextPhrase);
		}
		else {
			var nextStep: Element = $(element).parents(".step")[0].nextElementSibling;
			if (nextStep && nextStep.classList.contains("step")) {
				return this.findFirstStep(nextStep);
			}
			else {
				var nextSubrecipe: Element = $(element).parents(".subrecipe")[0].nextElementSibling;
				if (nextSubrecipe && nextSubrecipe.classList.contains("subrecipe")) {
					return this.findFirstStep(nextSubrecipe);
				}
			}
		}
		
		return undefined;
	}
	
	private set previousestStep(element: Element) {
		this._previousestStep = element;
		this._animator.addClass(element, "previousest-step");
	}
	
	private set previousStep(element: Element) {
		this._previousStep = element;
		this._animator.addClass(element, "completed-step");
		this._animator.addClass(element, "previous-step");
	}
	
	private set currentStep(element: Element) {
		this._currentStep = element;
		this._animator.addClass(element, "current-step");
	}
	
	private set nextStep(element: Element) {
		this._nextStep = element;
		this._animator.addClass(element, "next-step");
	}
	
	private set nextestStep(element: Element) {
		this._nextestStep = element;
		this._animator.addClass(element, "nextest-step");
	}
}