import {inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {HttpClient} from "aurelia-http-client";
import {I18N} from "aurelia-i18n";
import {QuickRecipe, Step, IngredientPart, IngredientEnumerationPart} from "quick-recipe/models/quick-recipe";
import {HelpOverlay} from "quick-recipe/components/help-overlay";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";
import {ScrollCoordinator} from "quick-recipe/scroll-coordinator";
import {Ingredient} from "shared/models/ingredient";

@inject (HttpClient, I18N, TimerCoordinator, ScrollCoordinator, DialogService)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];

	backgroundClass: string;
	isRecipeStarted: boolean;
	isRecipeDone: boolean;

	private _currentStepIndex: number = undefined;
	private _scrollCoordinator: ScrollCoordinator;
	private _timerCoordinator: TimerCoordinator;
	private _dialogService: DialogService;
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
		if ("Notification" in window) {
			if (Notification.permission !== "denied") {
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
			return confirm(this._i18n.tr("quickRecipe.exitConfirmation"));
		}
	}

	deactivate() {
		this._timerCoordinator.clear();
		this._scrollCoordinator.destroyScrollController();
	}

	startRecipe(): void {
		this._scrollCoordinator.createScrollController();
		this._currentStepIndex = 0;
		this.isRecipeStarted = true;

		this.decorateStepIngredients(this.getCurrentStep(), true, undefined);
		this.goToCurrentStep();
	}

	goToCurrentStep(): void {
		var navHeight = $(".subrecipe-titles")[0].offsetHeight;
		var element = $("#step-" + this._currentStepIndex)[0];
		var top = Math.max(0, element.offsetTop - ((window.innerHeight - navHeight - element.offsetHeight) / 2) + 32);
		this._scrollCoordinator.scrollTo(top);
	}

	completeStep(): void {
		if (!this.isCurrentStepActive) {
			return;
		}

		this.decorateStepIngredients(this.getCurrentStep(), false, true);

		if (this.isLastStep) {
			this.isRecipeDone = true;
			this._scrollCoordinator.destroyScrollController();
			return;
		}

		this._currentStepIndex++;

		this.decorateStepIngredients(this.getCurrentStep(), true, undefined);
		this.goToCurrentStep();
	}

	get activeSubrecipeId(): number {
		if (!this._currentStepIndex) {
			return -2;
		}

		return this.getCurrentStep().subrecipeId;
	}

	get isLastStep(): boolean {
		return this._currentStepIndex == this.recipe.steps.length - 1;
	}

	get isCurrentStepActive(): boolean {
		return $("#step-" + this._currentStepIndex).hasClass("active");
	}

    private getCurrentStep(): Step {
        return this.recipe.steps[this._currentStepIndex];
    }

	private decorateStepIngredients(step: Step, isCurrent?: boolean, isDone?: boolean): void {
        var ingredients = [];

		var ingredientParts = <IngredientPart[]>step.parts.filter(part => part.type == "ingredient");
		ingredientParts.forEach(part => {
            ingredients = ingredients.concat(this.recipe.ingredients.filter(ingredient => ingredient.id === part.ingredient.id));
		});

		var enumerationParts = <IngredientEnumerationPart[]>step.parts.filter(part => part.type == "enumeration");
		enumerationParts.forEach(enumeration => {
			enumeration.ingredients.forEach(part => {
                ingredients = ingredients.concat(this.recipe.ingredients.filter(ingredient => ingredient.id === part.id));
			});
		});

        ingredients.forEach(ingredient => {
            if (isCurrent != undefined) {
                if (isCurrent) {
                    $("#ingredient-" + ingredient.id).addClass("current");
                } else {
                    $("#ingredient-" + ingredient.id).removeClass("current");
                }
            }

            if (isDone != undefined && step.subrecipeId >= -1) {
                $("#ingredient-" + ingredient.id).addClass("done");
            }
        });
	}
}

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}
