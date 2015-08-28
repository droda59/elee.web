import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {QuickRecipe, Step} from "quick-recipe/models/quick-recipe";
import {Ingredient} from "shared/models/ingredient";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

@inject (HttpClient)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];
	
	backgroundClass: string;
	isRecipeStarted: boolean;
	isRecipeDone: boolean;
	
	previousestStep: Step;
	previousStep: Step;
	currentStep: Step;
	nextStep: Step;
	nextestStep: Step;
	
	private _currentStepIndex: number = 0;
    private _http: HttpClient;
	
	constructor(http: HttpClient) {
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
        });
	}

	canDeactivate() {
		return confirm('Are you sure you want to leave?');
	}
	
	startRecipe(): void {
		this.isRecipeStarted = true;
		
		this.currentStep = this.recipe.steps[this._currentStepIndex];
		this.nextStep = this.recipe.steps[this._currentStepIndex + 1];
		this.nextestStep = this.recipe.steps[this._currentStepIndex + 2];
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
	}
    
    get previousestStepPosition() {
		var previousestStepElement = $(".step.previousest-step")[0];
		var previousStepElement = $(".step.previous-step")[0];
		if (previousStepElement && previousestStepElement) {
			return previousStepElement.offsetTop - (previousStepElement.offsetParent.clientHeight * 0.03) - previousestStepElement.offsetHeight;
		}
		
		return 0;
    }
    
    get previousStepPosition() {
		var previousStepElement = $(".step.previous-step")[0];
		var currentStepElement = $(".step.current-step")[0];
		if (currentStepElement && previousStepElement) {
			return currentStepElement.offsetTop - (currentStepElement.offsetParent.clientHeight * 0.06) - previousStepElement.offsetHeight;
		}
		
		return 0;
    }
    
    get nextStepPosition() {
		var currentStepElement = $(".step.current-step")[0];
		if (currentStepElement) {
			return (currentStepElement.offsetTop + currentStepElement.offsetHeight) + (currentStepElement.offsetParent.clientHeight * 0.06);
		}
		
		return 0;
    }
    
    get nextestStepPosition() {
		var nextStepElement = $(".step.next-step")[0];
		if (nextStepElement) {
			return (nextStepElement.offsetTop + nextStepElement.offsetHeight) + (nextStepElement.offsetParent.clientHeight * 0.03);
		}
		
		return 0;
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