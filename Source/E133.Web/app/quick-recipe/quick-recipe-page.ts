import {inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {HttpClient} from "aurelia-http-client";
import {I18N} from "aurelia-i18n";
import {QuickRecipe, Step, IngredientPart, IngredientEnumerationPart} from "quick-recipe/models/quick-recipe";
import {HelpOverlay} from "quick-recipe/components/help-overlay";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";
import {ScrollCoordinator} from "quick-recipe/scroll-coordinator";
import {Ingredient} from "shared/models/ingredient";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

@inject (HttpClient, I18N, TimerCoordinator, ScrollCoordinator, DialogService)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];

	backgroundClass: string;
	isRecipeStarted: boolean;
	isRecipeDone: boolean;

	private _scrollCoordinator: ScrollCoordinator;
	private _timerCoordinator: TimerCoordinator;
	private _dialogService: DialogService;
	private _currentStepIndex: number = undefined;
    private _http: HttpClient;
	private _i18n: I18N;

	constructor(http: HttpClient, i18n: I18N, timerCoordinator: TimerCoordinator, scrollCoordinator: ScrollCoordinator, dialogService: DialogService) {
		this._http = http;
		this._i18n = i18n;
		this._timerCoordinator = timerCoordinator;
		this._scrollCoordinator = scrollCoordinator;
		this._dialogService = dialogService;
	}

	activate(route, routeConfig) {
		this._scrollCoordinator.createScrollController();

		if ("Notification" in window) {
			if (Notification.permission !== 'denied') {
				Notification.requestPermission();
			}
		}

		var hasSeenHelp = localStorage.getItem("helpSeen");
		if (!hasSeenHelp) {
			localStorage.setItem("helpSeen", "true");
			this._dialogService
				.open({ viewModel: HelpOverlay });
		}

		var url = "dist/quick-recipe/assets/json/" + route.id + ".json";
        return this._http.get(url).then(response => {
            this.recipe = response.content;

			moment.locale(this.recipe.language);
			this._i18n.setLocale(this.recipe.language);

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
		if (this.isRecipeStarted && !this.isRecipeDone) {
			return confirm('Are you sure you want to leave?');
		}
	}

	deactivate() {
		this._timerCoordinator.clear();
		this._scrollCoordinator.destroyScrollController();
	}

	startRecipe(): void {
		this.isRecipeStarted = true;
		this._currentStepIndex = 0;

		this.goToCurrentStep();
	}

	goToCurrentStep(): void {
		var element = $("#step-" + this._currentStepIndex)[0];
		var top = Math.max(0, element.offsetTop - ((window.innerHeight - element.offsetHeight - 150) / 2));
		this._scrollCoordinator.scrollTo(top);
	}

	completeStep(): void {
		if (!this.isCurrentStepActive) {
			return;
		}

		var step = this.recipe.steps[this._currentStepIndex];
		this.activateStepIngredients(step, true);

		if (this.isLastStep) {
			this.isRecipeDone = true;
			return;
		}

		this._currentStepIndex++;

		this.goToCurrentStep();
	}

	get activeSubrecipeId(): number {
		if (!this._currentStepIndex) {
			return -2;
		}

		var step = this.recipe.steps[this._currentStepIndex];
		return step.subrecipeId;
	}

	get isLastStep(): boolean {
		return this._currentStepIndex == this.recipe.steps.length - 1;
	}

	get isCurrentStepActive(): boolean {
		return $("#step-" + this._currentStepIndex).hasClass("active");
	}

	private activateStepIngredients(step: Step, activate: boolean): void {
		if (step.subrecipeId >= -1) {
			var ingredientParts: IngredientPart[] = <IngredientPart[]>step.parts.filter(
				part => part.type == "ingredient"
			);
			ingredientParts.forEach(part => {
				this.recipe.ingredients
					.filter(ingredient => ingredient.id === part.ingredient.id)
					.forEach(element => element.done = activate);
			});

			var enumerationParts = <IngredientEnumerationPart[]>step.parts.filter(
				part => part.type == "enumeration"
			);
			enumerationParts.forEach(enumeration => {
				enumeration.ingredients.forEach(part => {
					this.recipe.ingredients
						.filter(ingredient => ingredient.id === part.id)
						.forEach(element => element.done = activate);
				});
			});
		}
	}
}
