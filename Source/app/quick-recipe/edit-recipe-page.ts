import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {MdToastService} from "aurelia-materialize-bridge";
import {moveBefore, DIRECTION} from "aurelia-dragula";
import {QuickRecipeService} from "app/shared/quick-recipe-service";
import {QuickRecipe, Subrecipe, Step} from "app/quick-recipe/models/quick-recipe";
import {PartFactory, TextPart, ActionPart, TimerPart, IngredientPart, IngredientEnumerationPart}
    from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {MeasureUnitProvider} from "app/shared/measure-unit-provider";

@autoinject()
export class EditRecipePage {
    recipe: QuickRecipe;
    subrecipes: Array<QuickRecipeSubrecipe> = [];
    ingredients: Array<Ingredient> = [];
    steps: Array<Step> = [];
    measureUnits: Array<MeasureUnit> = [];
    dragDirection: DIRECTION;

    private _service: QuickRecipeService;
    private _i18n: I18N;
    private _toast: MdToastService;
    private _router: Router;
    private _wasSaved: boolean = false;

    constructor(service: QuickRecipeService, i18n: I18N, router: Router, toast: MdToastService, measureUnitProvider: MeasureUnitProvider) {
        this._service = service;
        this._i18n = i18n;
		this._router = router;
        this._toast = toast;

        this.dragDirection = DIRECTION.HORIZONTAL;
        this.measureUnits = measureUnitProvider.measureUnits;
    }

    activate(route, routeConfig): Promise<void> {
        return this._service.getRecipe(route.id)
            .then(response => {
                this.recipe = new QuickRecipe(response);
                (this.recipe.subrecipes || []).forEach(
                    (subrecipe) => {
                        var quickRecipeSubrecipe = new QuickRecipeEditionSubrecipe();
                        quickRecipeSubrecipe.id = subrecipe.id;
                        quickRecipeSubrecipe.title = subrecipe.title;
                        quickRecipeSubrecipe.steps = this.recipe.steps.filter(step => step.subrecipeId === subrecipe.id);
                        quickRecipeSubrecipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.subrecipeId === subrecipe.id);

                        if (quickRecipeSubrecipe.steps.length || quickRecipeSubrecipe.ingredients.length) {
                            this.subrecipes.push(quickRecipeSubrecipe);
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

    addSubrecipe(): void {
        var newSubrecipe = new QuickRecipeEditionSubrecipe();
        newSubrecipe.id = Math.max.apply(Math, this.subrecipes.map(x => x.id)) + 1;

        this.subrecipes.push(newSubrecipe);
    }

    removeSubrecipe(subrecipe: Subrecipe): void {
        this._removeFromArray(this.subrecipes, subrecipe);

        subrecipe.ingredients.forEach(ingredient => this._removeFromArray(this.ingredients, ingredient));
        subrecipe.steps.forEach(step => this._removeFromArray(this.steps, step));
    }

    addIngredient(subrecipe: Subrecipe): void {
        var newIngredient = new Ingredient();
        newIngredient.id = Math.max.apply(Math, this.ingredients.map(x => x.id)) + 1;
        newIngredient.subrecipeId = subrecipe.id;

        subrecipe.ingredients.push(newIngredient);
        this.ingredients.push(newIngredient);
    }

    removeIngredient(subrecipe: Subrecipe, ingredient: Ingredient): void {
        this._removeFromArray(subrecipe.ingredients, ingredient);
        this._removeFromArray(this.ingredients, ingredient);
    }

    addStep(subrecipe: Subrecipe): void {
        var newStep = new Step();
        newStep.id = Math.max.apply(Math, this.steps.map(x => x.id)) + 1;
        newStep.subrecipeId = subrecipe.id;

        let lastSubrecipeStepIndex = this.steps.indexOf(subrecipe.steps[subrecipe.steps.length - 1]);
        this.steps.splice(lastSubrecipeStepIndex + 1, 0, newStep);

        subrecipe.steps.push(newStep);
    }

    removeStep(subrecipe: Subrecipe, step: Step): void {
        this._removeFromArray(subrecipe.steps, step);
        this._removeFromArray(this.steps, step);
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

    addIngredientStepPart(subrecipe: Subrecipe, step: Step): void {
        var part = PartFactory.createPart(step.id, IngredientPart.type);
        var subrecipeIngredients = subrecipe.ingredients;
        if (subrecipe.id === -2) {
            subrecipeIngredients = this.ingredients;
        }
        part.ingredient = subrecipeIngredients[0];

        step.parts.push(part);
    }

    addEnumerationStepPart(step: Step): void {
        var part = PartFactory.createPart(step.id, IngredientEnumerationPart.type);
        part.ingredients = [];

        step.parts.push(part);
    }

    removeStepPart(subrecipe: Subrecipe, step: Step, part: Part): void {
        this._removeFromArray(step.parts, part);

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
            step.parts.filter(part => part.type === IngredientEnumerationPart.type).forEach(part => {
                part.ingredients = part.ingredients.selectMany(x => x.ingredient);
            });
        });
        this.recipe.steps = this.steps;

        this.subrecipes.forEach(subrecipe => {
            subrecipes.push(<Subrecipe>{ id: subrecipe.id, title: subrecipe.title });
        });
        this.recipe.subrecipes = subrecipes;

        var jsonOutput = JSON.stringify(this.recipe);

        this._toast.show(this._i18n.tr("edit.saving"), 2000);
        this._service.saveRecipe(this.recipe.id, this.recipe)
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
        this._router.navigateToRoute("quick-recipe", { "id": this.recipe.id }, undefined);
    }

    findStep(stepId: number): Step {
        return this.steps.filter(step => step.id === stepId)[0];
    }

    private _removeFromArray(array: Array, object: any): void {
        var index = array.indexOf(object);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

class QuickRecipeEditionSubrecipe extends Subrecipe {
    steps: Array<Step> = [];
    ingredients: Array<Ingredient> = [];
}
