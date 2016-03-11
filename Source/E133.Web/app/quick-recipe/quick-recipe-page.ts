import {inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {CssAnimator} from "aurelia-animator-css";
import {HttpClient} from "aurelia-http-client";
import {I18N} from "aurelia-i18n";
import {QuickRecipe, Step, IngredientPart, IngredientEnumerationPart} from "quick-recipe/models/quick-recipe";
import {HelpOverlay} from "quick-recipe/components/help-overlay";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";
import {ScrollCoordinator} from "quick-recipe/scroll-coordinator";
import {Ingredient} from "shared/models/ingredient";
import * as $ from "jquery";

@inject (HttpClient, I18N, TimerCoordinator, ScrollCoordinator, DialogService, CssAnimator)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipes: QuickRecipeSubrecipe[] = [];

	backgroundClass: string;
	isRecipeStarted: boolean;
	isRecipeDone: boolean;

	private _currentStepId: number = undefined;
	private _navigationStepId: number = undefined;
	private _scrollCoordinator: ScrollCoordinator;
	private _timerCoordinator: TimerCoordinator;
	private _dialogService: DialogService;
    private _http: HttpClient;
	private _i18n: I18N;
    private _animator: CssAnimator;

	constructor(http: HttpClient, i18n: I18N, timerCoordinator: TimerCoordinator, scrollCoordinator: ScrollCoordinator, dialogService: DialogService, animator: CssAnimator) {
		this._http = http;
		this._i18n = i18n;
		this._timerCoordinator = timerCoordinator;
		this._scrollCoordinator = scrollCoordinator;
		this._dialogService = dialogService;
        this._animator = animator;
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
					var quickRecipeSubrecipe = new QuickRecipeSubrecipe();
					quickRecipeSubrecipe.id = subrecipe.id;
					quickRecipeSubrecipe.title = subrecipe.title;
					quickRecipeSubrecipe.steps = this.recipe.steps.filter(step => step.subrecipeId === subrecipe.id);
					quickRecipeSubrecipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.subrecipeId === subrecipe.id);

					if (quickRecipeSubrecipe.steps.length || quickRecipeSubrecipe.ingredients.length) {
						this.subrecipes.push(quickRecipeSubrecipe);
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
		this.isRecipeStarted = true;

		this._currentStepId = this.getNextUncompletedStepId();
        this._navigationStepId = this._currentStepId;
		this.goToCurrentStep();
	}

	completeStep(): void {
		if (!this.isCurrentStepActive) {
			return;
		}

		this.decorateStepIngredients(this.getCurrentStep(), "done");
        $("#step-" + this._currentStepId).addClass("complete");

		if (this.isCurrentLastStep) {
			this.isRecipeDone = true;
			this._scrollCoordinator.destroyScrollController();
			return;
		}

		this._currentStepId = this.getNextUncompletedStepId();
		this.goToCurrentStep();
	}

    goToSubrecipe(subrecipeId: number): void {
        var subrecipeSteps = $("#subrecipe-" + subrecipeId + " .step");
        var uncompletedSubrecipeSteps = subrecipeSteps.not(".complete");

        var step;
        if (uncompletedSubrecipeSteps.length) {
            step = uncompletedSubrecipeSteps[0];
        } else {
            step = subrecipeSteps[0];
        }
        var nextStepId = parseInt(step.id.substr(5));

        this.triggerSubrecipeChangeAnimation(this._currentStepId, nextStepId);
		this.decorateStepIngredients(this.getCurrentStep(), "");

        this._currentStepId = nextStepId;
        this._navigationStepId = this._currentStepId;
        this.goToStepId(this._currentStepId);
    }

	goToPreviousStep(): void {
        if (this.isNavigationFirstStep) {
            return;
        }

        this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._navigationStepId - 1);
		this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

		this._navigationStepId--;

		this.goToStepId(this._navigationStepId);
	}

    goToNextStep(): void {
        if (this.isNavigationLastStep) {
            return;
        }

        this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._navigationStepId + 1);
		this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

		this._navigationStepId++;

		this.goToStepId(this._navigationStepId);
    }

	goToCurrentStep(): void {
        this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._currentStepId);
		this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

        this._navigationStepId = this._currentStepId;

		this.goToStepId(this._currentStepId);
	}

	get activeSubrecipeId(): number {
		if (!this._navigationStepId) {
			return -2;
		}

		return this.getStep(this._navigationStepId).subrecipeId;
	}

	get isCurrentStepActive(): boolean {
		return $("#step-" + this._currentStepId).hasClass("active");
	}

	get isCurrentLastStep(): boolean {
		return this._currentStepId == this.recipe.steps.length - 1;
	}

	get isNavigationFirstStep(): boolean {
		return this._navigationStepId <= 0;
    }

	get isNavigationLastStep(): boolean {
		return this._navigationStepId == this.recipe.steps.length - 1;
	}

    private getNextUncompletedStepId(): number {
        var stepId = undefined;

        if (this._currentStepId === undefined) {
            return 0;
        }

        var uncompletedSubrecipeSteps = $(".step").not(".complete");
        if (uncompletedSubrecipeSteps.length) {
            var nextSteps = uncompletedSubrecipeSteps
                .filter((index, step) =>
                    parseInt(step.id.substr(5)) > this._currentStepId);

            stepId = parseInt(nextSteps[0].id.substr(5));
        }

        return stepId;
    }

    private goToStepId(stepId: number): void {
		var element = $("#step-" + stepId)[0];
		var navHeight = $(".subrecipe-titles")[0].offsetHeight;
		var top = Math.max(0, element.offsetTop - ((window.innerHeight - navHeight - element.offsetHeight) / 2) + 32);
		this._scrollCoordinator.scrollTo(top);

        var targetStep = this.recipe.steps[stepId];
		this.decorateStepIngredients(targetStep, "current");
    }

    private triggerSubrecipeChangeAnimation(currentStepId: number, nextStepId: number): void {
        var subrecipeIdBefore = this.recipe.steps[currentStepId].subrecipeId;

        var subrecipeIdAfter = this.recipe.steps[nextStepId].subrecipeId;
        if (subrecipeIdBefore != subrecipeIdAfter) {
            var subrecipeElement = $("#subrecipe-" + subrecipeIdAfter + " .subrecipe-title")[0];
            this._animator.animate(subrecipeElement, "subrecipe-title-animation");
        }
    }

    private getCurrentStep(): Step {
        return this.getStep(this._currentStepId);
    }

    private getStep(stepId: number): Step {
        return this.recipe.steps[stepId];
    }

	private decorateStepIngredients(step: Step, state: string): void {
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
            ingredient.state = "";

            if (state === "done") {
                if (step.subrecipeId >= -1) {
                    ingredient.state = state;
                }
            } else {
                ingredient.state = state;
            }
        });
	}
}

class QuickRecipeSubrecipe {
    id: number;
	title: string;
	steps: Step[];
	ingredients: Ingredient[];
}
