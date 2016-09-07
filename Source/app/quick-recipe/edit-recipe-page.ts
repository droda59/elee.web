import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {QuickRecipe, Subrecipe, Step} from "app/quick-recipe/models/quick-recipe";
import {PartFactory, TextPart, ActionPart, TimerPart, IngredientPart, IngredientEnumerationPart}
    from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {MeasureUnitProvider} from "app/shared/measure-unit-provider";

@autoinject()
export class EditRecipePage {
    recipe: QuickRecipe;
    subrecipes: QuickRecipeSubrecipe[] = [];
    measureUnits: MeasureUnit[] = [];

    private _http: HttpClient;
    private _i18n: I18N;

    constructor(http: HttpClient, i18n: I18N, router: Router, measureUnitProvider: MeasureUnitProvider) {
        this._http = http;
        this._i18n = i18n;
		this._router = router;

        this.measureUnits = measureUnitProvider.measureUnits;
    }

    activate(route, routeConfig) {
        return this._http
            .get("http://eleeapi.azurewebsites.net/api/quickrecipe/" + route.id)
            .then(response => {
                this.recipe = new QuickRecipe(response.content);
                (this.recipe.subrecipes || []).forEach(
                    (subrecipe) => {
                        var quickRecipeSubrecipe = new QuickRecipeEditionSubrecipe();
                        quickRecipeSubrecipe.id = subrecipe.id;
                        quickRecipeSubrecipe.title = subrecipe.title;
                        quickRecipeSubrecipe.steps = this.recipe.steps.filter(step => step.subrecipeId === subrecipe.id);
                        quickRecipeSubrecipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.subrecipeId === subrecipe.id);
                        quickRecipeSubrecipe.timers = [];

                        if (quickRecipeSubrecipe.steps.length || quickRecipeSubrecipe.ingredients.length) {
                            this.subrecipes.push(quickRecipeSubrecipe);
                        }
                    }
                );

                routeConfig.navModel.title = this.recipe.title;
            });
    }

    attached() {
        Materialize.updateTextFields();
    }

    canDeactivate() {
        return confirm(this._i18n.tr("edit.exitConfirmation"));
    }

    addSubrecipe(): void {
        var newSubrecipe = new QuickRecipeEditionSubrecipe();
        newSubrecipe.id = Math.max.apply(Math, this.subrecipes.map(x => x.id)) + 1;

        this.subrecipes.push(newSubrecipe);
    }

    removeSubrecipe(subrecipe: Subrecipe): void {
        this._removeFromArray(this.subrecipes, subrecipe);
    }

    addIngredient(subrecipe: Subrecipe): void {
        var newIngredient = new Ingredient();
        newIngredient.id = Math.max.apply(Math, subrecipe.ingredients.map(x => x.id)) + 1;
        newIngredient.subrecipeId = subrecipe.id;

        subrecipe.ingredients.push(newIngredient);
    }

    removeIngredient(subrecipe: Subrecipe, ingredient: Ingredient): void {
        this._removeFromArray(subrecipe.ingredients, ingredient);
    }

    addStep(subrecipe: Subrecipe): void {
        var newStep = new Step();
        newStep.id = Math.max.apply(Math, subrecipe.steps.map(x => x.id)) + 1;
        newStep.subrecipeId = subrecipe.id;

        subrecipe.steps.push(newStep);
    }

    removeStep(subrecipe: Subrecipe, step: Step): void {
        this._removeFromArray(subrecipe.steps, step);
    }

    addTextStepPart(step: Step): void {
        var part = PartFactory.createPart(step, TextPart.type);
        step.parts.push(part);
    }

    addActionStepPart(step: Step): void {
        var part = PartFactory.createPart(step, ActionPart.type);
        step.parts.push(part);
    }

    addTimerStepPart(step: Step): void {
        // TODO Put the last action
        var part = PartFactory.createPart(step, TimerPart.type);
        step.parts.push(part);
    }

    addIngredientStepPart(subrecipe: Subrecipe, step: Step): void {
        var part = PartFactory.createPart(step, IngredientPart.type);
        step.parts.push(part);
    }

    addEnumerationStepPart(step: Step): void {
        var part = PartFactory.createPart(step, IngredientEnumerationPart.type);
        step.parts.push(part);
    }

    removeStepPart(subrecipe: Subrecipe, step: Step, part: Part): void {
        this._removeFromArray(step.parts, part);

        if (!step.parts.length) {
            this.removeStep(subrecipe, step);
        }
    }

    saveRecipe(): void {
        this._http.createRequest(null)
            .withUrl("http://localhost:5000/api/quickrecipe", this.recipe)
            .withHeader("Content-Type", "application/json")
            .asPut()
            .send()
            .then(data => {
                this._router.navigateToRoute("quick-recipe", { "id": this.recipe.id }, undefined);
            });
    }

    private _removeFromArray(array: any[], object: any): void {
        var index = array.indexOf(object);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

class QuickRecipeEditionSubrecipe {
    id: number;
    title: string;
    steps: Step[] = [];
    ingredients: Ingredient[] = [];
}
