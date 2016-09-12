import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {MdToastService} from "aurelia-materialize-bridge";
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

    private _http: HttpClient;
    private _i18n: I18N;
    private _toast: MdToastService;
    private _wasSaved: boolean = false;

    constructor(http: HttpClient, i18n: I18N, router: Router, toast: MdToastService, measureUnitProvider: MeasureUnitProvider) {
        this._http = http;
        this._i18n = i18n;
		this._router = router;
        this._toast = toast;

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

    attached() {
        Materialize.updateTextFields();
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

        subrecipe.steps.push(newStep);
        this.steps.push(newStep);
    }

    removeStep(subrecipe: Subrecipe, step: Step): void {
        this._removeFromArray(subrecipe.steps, step);
        this._removeFromArray(this.steps, step);
    }

    addTextStepPart(step: Step): void {
        var part = PartFactory.createPart(step, TextPart.type);
        part.value = "";

        step.parts.push(part);
    }

    addActionStepPart(step: Step): void {
        var part = PartFactory.createPart(step, ActionPart.type);
        part.value = "";

        step.parts.push(part);
    }

    addTimerStepPart(step: Step): void {
        // TODO Put the last action
        var part = PartFactory.createPart(step, TimerPart.type);
        part.timer = "";

        step.parts.push(part);
    }

    addIngredientStepPart(subrecipe: Subrecipe, step: Step): void {
        var part = PartFactory.createPart(step, IngredientPart.type);
        part.ingredient = subrecipe.ingredients[0];

        step.parts.push(part);
    }

    addEnumerationStepPart(step: Step): void {
        var part = PartFactory.createPart(step, IngredientEnumerationPart.type);
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
        // this._http.createRequest(null)
        //     .withUrl("http://localhost:5000/api/quickrecipe", this.recipe)
        //     .withHeader("Content-Type", "application/json")
        //     .asPut()
        //     .send()
        //     .then(data => {
            this._toast.show(this._i18n.tr("edit.saved"), 1000).then(() => {
                this._wasSaved = true;
                this.returnToRecipe();
            });
        //     });
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
