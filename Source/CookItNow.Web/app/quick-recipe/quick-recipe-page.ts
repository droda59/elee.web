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
	
	backgroundClass: string;
	isRecipeDone: boolean;
	
	previousestStep: Step;
	previousStep: Step;
	currentStep: Step;
	nextStep: Step;
	nextestStep: Step;
	
	private _currentStepIndex: number = 0;
	
    private _http: HttpClient;
	private _eventAggregator: EventAggregator;
	
	constructor(http: HttpClient, eventAggregator: EventAggregator, element: Element) {
		this._eventAggregator = eventAggregator;
		this._http = http;
	}
	
	activate(route, routeConfig) {
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
	
	attached() {
		this.currentStep = this.recipe.steps[this._currentStepIndex];
		this.nextStep = this.recipe.steps[this._currentStepIndex + 1];
		this.nextestStep = this.recipe.steps[this._currentStepIndex + 2];
		
		this.updatePositions();
	}
	
	backStep(): void {
		if (this.isFirstStep) {
			return;
		}
		
		this._currentStepIndex--;
		
		this.nextestStep = this.nextestStep;
		this.nextStep = this.currentStep;
		this.currentStep = this.previousStep;
		this.previousStep = this.recipe.steps[this._currentStepIndex - 1];
		this.previousestStep = this.recipe.steps[this._currentStepIndex - 2];
		
		this.updatePositions();
	}

	completeStep(): void {
		if (this.isLastStep) {
			this.isRecipeDone = true;
			return;
		}
		
		this._currentStepIndex++;
		
		this.previousestStep = this.previousStep;
		this.previousStep = this.currentStep;
		this.currentStep = this.nextStep;
		this.nextStep = this.recipe.steps[this._currentStepIndex + 1];
		this.nextestStep = this.recipe.steps[this._currentStepIndex + 2];
		
		this.updatePositions();
	}
	
	private updatePositions(): void {
		// TODO This must be done after the view was refreshed
		var previousestStepElement = $(".step.previousest-step");
		var previousStepElement = $(".step.previous-step");
		var nextStepElement = $(".step.next-step");
		var nextestStepElement = $(".step.nextest-step");
		
		var currentStepElement = $(".step.current-step")[0];
		if (currentStepElement) {
			var longDistance = currentStepElement.offsetParent.clientHeight * 0.26;
			var closeDistance = currentStepElement.offsetParent.clientHeight * 0.16;
			
			previousestStepElement.css("bottom", longDistance + currentStepElement.offsetTop);
			previousStepElement.css("bottom", closeDistance + currentStepElement.offsetTop);
			nextStepElement.css("top", closeDistance + currentStepElement.offsetTop);
			nextestStepElement.css("top", longDistance + currentStepElement.offsetTop);
		}
	}
	
	get activeSubrecipeId(): number {
		if (!this.currentStep) {
			return -2;
		}
		
		return this.currentStep.subrecipeId;
	}
	
	get isFirstStep(): boolean {
		return this._currentStepIndex == 0;
	}
	
	get isLastStep(): boolean {
		return this._currentStepIndex == this.recipe.steps.length - 1;
	}
}