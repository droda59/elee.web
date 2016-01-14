import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {I18N} from "aurelia-i18n";
import {QuickRecipe, Step, IngredientPart, IngredientEnumerationPart} from "quick-recipe/models/quick-recipe";
import {Ingredient} from "shared/models/ingredient";
import * as moment from "moment";
import * as ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import * as TweenMax from "gsap";
import "gsap/src/uncompressed/plugins/ScrollToPlugin";

class QuickRecipeSubrecipeIngredient {
	subrecipeTitle: string;
	ingredients: Ingredient[];
}

@inject (HttpClient, I18N)
export class QuickRecipePage {
    recipe: QuickRecipe;
	subrecipeIngredients: QuickRecipeSubrecipeIngredient[] = [];

	backgroundClass: string;
	isRecipeStarted: boolean;
	isRecipeDone: boolean;
	isSidePanelHidden: boolean = false;

	private _currentStepIndex: number = undefined;
    private _http: HttpClient;
	private _i18n: I18N;
	private _scrollController;

	constructor(http: HttpClient, i18n: I18N) {
		this._http = http;
		this._i18n = i18n;

        this._scrollController = new ScrollMagic.Controller()
			.scrollTo(function (newPos) {
				TweenMax.to(window, 0.5, { scrollTo: { y: newPos }});
			});
	}

	activate(route, routeConfig) {
		// TODO Ugly-ass code; used to decide randomly which background to pick. this should go somewhere else
		var backgroundId = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		// switch (backgroundId) {
		// 	case 1:
		// 		this.backgroundClass = "chalkboard";
		// 		break;
		// 	case 2:
		// 		this.backgroundClass = "wood";
		// 		break;
		// 	default:
		// 		this.backgroundClass = "stone";
		// 		break;
		// }
		this.backgroundClass = "chalkboard";

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

		if ("Notification" in window) {
			if (Notification.permission !== 'denied') {
				Notification.requestPermission();
			}
		}

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
		return confirm('Are you sure you want to leave?');
	}

	startRecipe(): void {
		this.isRecipeStarted = true;
		this._currentStepIndex = 0;

		this.recipe.steps.forEach((step, index) => {
			var elementId = "#step-" + index;
			TweenMax.set(elementId + " p", { opacity: "0" });
			TweenMax.set(elementId + " span", { fontSize: "0.5rem" });
			TweenMax.set(elementId + " .emphasis", { fontSize: "0.5rem" });
			TweenMax.set(elementId + " ul", { margin: "0rem 2rem 0rem 3rem" });
			TweenMax.set(elementId + " li", { lineHeight: "0.5rem", padding: "0px 20px" });

			var sceneMiddle = new ScrollMagic
				.Scene({ triggerElement: elementId, offset: 50, duration: 200 })
				.setPin(elementId + " p")
				.addTo(this._scrollController);

			var isEnumeration = step.parts.filter(part => part.type == "enumeration").length > 0;
			if (isEnumeration) {
				sceneMiddle.setClassToggle(elementId + " li label", "visible");
			}

			var timelineTop = new TimelineMax().add([
				TweenMax.to(elementId + " p", 2, { left: "250px", opacity: "0" }),
				TweenMax.to(elementId + " span", 2, { fontSize: "0.5rem" }),
				TweenMax.to(elementId + " .emphasis", 2, { fontSize: "0.5rem" }),
				TweenMax.to(elementId + " ul", 2, { margin: "0rem 2rem 0rem 3rem" }),
				TweenMax.to(elementId + " li", 2, { lineHeight: "0.5rem", padding: "0px 20px" })
			]);

			var sceneTop = new ScrollMagic
				.Scene({ triggerElement: elementId, offset: 250, duration: 400 })
				.setTween(timelineTop)
				.addTo(this._scrollController);

			var timelineBottom = new TimelineMax().add([
				TweenMax.to(elementId + " p", 2, { left: "0", opacity: "1" }),
				TweenMax.to(elementId + " span", 2, { fontSize: "1rem" }),
				TweenMax.to(elementId + " .emphasis", 2, { fontSize: "2rem" }),
				TweenMax.to(elementId + " ul", 2, { margin: "1rem 2rem 1rem 3rem" }),
				TweenMax.to(elementId + " li", 2, { lineHeight: "1.5rem", padding: "10px 20px" })
			]);

			var sceneBottom = new ScrollMagic
				.Scene({ triggerElement: elementId, offset: -350, duration: 400 })
				.setTween(timelineBottom)
				.addTo(this._scrollController);
		});

		this.goToCurrentStep();
	}

	goToCurrentStep(): void {
		var top = $("#step-" + this._currentStepIndex)[0].offsetTop - 200;
		this._scrollController.scrollTo(top);
	}

	completeStep(): void {
		if (this.isLastStep) {
			this.isRecipeDone = true;
			return;
		}

		var step = this.recipe.steps[this._currentStepIndex];
		this.activateStepIngredients(step, true);

		this._currentStepIndex++;

		this.goToCurrentStep();
	}

	toggleSidePanelVisibility() {
		this.isSidePanelHidden = !this.isSidePanelHidden;
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

	private activateStepIngredients(step: Step, activate: boolean): void {
		if (step.subrecipeId >= 0) {
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
