import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {MdToastService} from "aurelia-materialize-bridge";
import {moveBefore, DIRECTION} from "aurelia-dragula";
import {MeasureUnitProvider} from "app/shared/measure-unit-provider";
import {Quantity} from "app/shared/models/quantity";
import {Ingredient} from "app/shared/models/ingredient";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {QuickRecipeService} from "app/quick-recipe/quick-recipe-service";
import {PartFactory} from "app/quick-recipe/part-factory";
import {QuickRecipe, Duration, Subrecipe, Step} from "app/quick-recipe/models/quick-recipe";
import {Part, TextPart, ActionPart, TimerPart, IngredientPart, QuantityOfIngredientPart, EnumerationPart}
    from "app/quick-recipe/models/quick-recipe";
import {EditionSubrecipe} from "app/administration/edit-recipe/models/edition-subrecipe";
import {AdminQuickRecipeService} from "app/administration/recipes/admin-quick-recipe-service";

@autoinject()
export class EditRecipePage {
    recipe: QuickRecipe;
    subrecipes: Array<EditionSubrecipe> = [];
    ingredients: Array<Ingredient> = [];
    steps: Array<Step> = [];
    measureUnits: Array<MeasureUnit> = [];
    dragDirection: DIRECTION;

    private _service: QuickRecipeService;
    private _adminService: AdminQuickRecipeService;
    private _i18n: I18N;
    private _toast: MdToastService;
    private _router: Router;
    private _wasSaved: boolean = false;

    constructor(service: QuickRecipeService, adminService: AdminQuickRecipeService, i18n: I18N, router: Router, toast: MdToastService, measureUnitProvider: MeasureUnitProvider) {
        this._service = service;
        this._adminService = adminService;
        this._i18n = i18n;
		this._router = router;
        this._toast = toast;

        this.dragDirection = DIRECTION.HORIZONTAL;
        this.measureUnits = measureUnitProvider.measureUnits;
    }

    activate(route, routeConfig): Promise<void> {
        return this._service.getRecipe(route.uniqueName)
            .then(response => {
                this.recipe = new QuickRecipe(response);
                (this.recipe.subrecipes || []).forEach(
                    (subrecipe) => {
                        var editionSubrecipe = new EditionSubrecipe();
                        editionSubrecipe.id = subrecipe.id;
                        editionSubrecipe.title = subrecipe.title;
                        editionSubrecipe.steps = this.recipe.steps.filter(step => step.subrecipeId === subrecipe.id);
                        editionSubrecipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.subrecipeId === subrecipe.id);

                        if (editionSubrecipe.steps.length || editionSubrecipe.ingredients.length) {
                            this.subrecipes.push(editionSubrecipe);
                        }
                    }
                );

                this.ingredients = this.recipe.ingredients;
                this.steps = this.recipe.steps;

                routeConfig.navModel.title = this.recipe.title;
            });
    }

    canDeactivate() {
        if (this._wasSaved) {
            return true;
        } else {
            return confirm(this._i18n.tr("edit.exitConfirmation"));
        }
    }

    addDuration(): void {
        var newDuration = new Duration();

        this.recipe.durations.push(newDuration);
    }

    removeDuration(duration: Duration): void {
        this.recipe.durations.removeFromArray(duration);
    }

    addSubrecipe(): void {
        var newSubrecipe = new EditionSubrecipe();
        newSubrecipe.id = Math.max.apply(Math, this.subrecipes.map(x => x.id)) + 1;

        this.subrecipes.push(newSubrecipe);
    }

    removeSubrecipe(subrecipe: EditionSubrecipe): void {
        this.subrecipes.removeFromArray(subrecipe);

        subrecipe.ingredients.forEach(ingredient => this.ingredients.removeFromArray(ingredient));
        subrecipe.steps.forEach(step => this.steps.removeFromArray(step));
    }

    addIngredient(subrecipe: EditionSubrecipe): void {
        var newIngredient = new Ingredient();
        newIngredient.id = Math.max.apply(Math, this.ingredients.map(x => x.id)) + 1;
        newIngredient.subrecipeId = subrecipe.id;

        subrecipe.ingredients.push(newIngredient);
        this.ingredients.push(newIngredient);
    }

    removeIngredient(subrecipe: EditionSubrecipe, ingredient: Ingredient): void {
        subrecipe.ingredients.removeFromArray(ingredient);
        this.ingredients.removeFromArray(ingredient);
    }

    addStep(subrecipe: EditionSubrecipe): void {
        var newStep = new Step();
        newStep.id = Math.max.apply(Math, this.steps.map(x => x.id)) + 1;
        newStep.subrecipeId = subrecipe.id;

        let lastSubrecipeStepIndex = this.steps.indexOf(subrecipe.steps[subrecipe.steps.length - 1]);
        this.steps.splice(lastSubrecipeStepIndex + 1, 0, newStep);

        subrecipe.steps.push(newStep);
    }

    removeStep(subrecipe: EditionSubrecipe, step: Step): void {
        subrecipe.steps.removeFromArray(step);
        this.steps.removeFromArray(step);
    }

    addTextStepPart(step: Step): void {
        var part = PartFactory.createPart(step.id, TextPart.type);
        part.value = "";

        step.parts.push(part);
    }

    addActionStepPart(step: Step): void {
        var part = PartFactory.createPart(step.id, ActionPart.type);
        part.value = "";

        step.parts.push(part);
    }

    addTimerStepPart(step: Step): void {
        // TODO Put the last action
        var part = PartFactory.createPart(step.id, TimerPart.type);
        part.timer = "";

        step.parts.push(part);
    }

    addIngredientStepPart(subrecipe: EditionSubrecipe, step: Step): void {
        var part = PartFactory.createPart(step.id, IngredientPart.type);
        var subrecipeIngredients = subrecipe.ingredients;
        if (subrecipe.id === -2) {
            subrecipeIngredients = this.ingredients;
        }
        part.ingredient = subrecipeIngredients[0];

        step.parts.push(part);
    }

    addQuantityOfIngredientStepPart(subrecipe: EditionSubrecipe, step: Step): void {
        var part = PartFactory.createPart(step.id, QuantityOfIngredientPart.type);
        var subrecipeIngredients = subrecipe.ingredients;
        if (subrecipe.id === -2) {
            subrecipeIngredients = this.ingredients;
        }

        part.ingredient = subrecipeIngredients[0];
        part.quantity = new Quantity(subrecipeIngredients[0].quantity);

        step.parts.push(part);
    }

    addEnumerationStepPart(step: Step): void {
        var part = PartFactory.createPart(step.id, EnumerationPart.type);
        part.parts = [];

        step.parts.push(part);
    }

    removeStepPart(subrecipe: EditionSubrecipe, step: Step, part: Part): void {
        step.parts.removeFromArray(part);

        if (!step.parts.length) {
            this.removeStep(subrecipe, step);
        }
    }

    saveRecipe(): void {
        let subrecipes: Array<Subrecipe> = [];

        var subrecipeId = 0;
        var ingredientId = 0;
        var stepId = 0;

        this.ingredients.forEach(ingredient => {
            ingredient.id = ingredientId++;
            ingredient.quantity.abbreviation = ingredient.quantity.unit.abbreviation;
        });
        this.recipe.ingredients = this.ingredients;

        this.steps.forEach(step => {
            step.id = stepId++;
        });
        this.recipe.steps = this.steps;

        this.subrecipes.forEach(subrecipe => {
            subrecipes.push(<Subrecipe>{ id: subrecipe.id, title: subrecipe.title });
        });
        this.recipe.subrecipes = subrecipes;

        var jsonOutput = JSON.stringify(this.recipe);

        this._toast.show(this._i18n.tr("edit.saving"), 2000);
        this._adminService.saveRecipe(this.recipe.id, this.recipe)
            .then(data => {
                this._toast.show(this._i18n.tr("edit.saved"), 1000).then(() => {
                    this._wasSaved = true;
                    this.returnToRecipe();
                });
            }, data => {
                this._toast.show(this._i18n.tr("edit.notsaved"), 1000);
            }
        );
    }

    itemDropped(item, target, source, sibling) {
        var itemId = source.dataset.index;
        var siblingId = sibling ? sibling.dataset.index : null;

        if (source.dataset.stepId !== target.dataset.stepId) {
            return;
        }

        var step = this.steps.filter(x => x.id == source.dataset.stepId)[0];

        moveBefore(step.parts, (part) => part === step.parts[itemId], (part) => part === step.parts[siblingId]);
    }

    returnToRecipe() {
        this._router.navigateToRoute("quick-recipe", { "id": this.recipe.uniqueName }, undefined);
    }

	returnToRecipes() {
		this._router.navigateToRoute("administration");
	}

    findStep(stepId: number): Step {
        return this.steps.filter(step => step.id === stepId)[0];
    }
}
