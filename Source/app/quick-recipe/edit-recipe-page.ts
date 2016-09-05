import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {QuickRecipe} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {MeasureUnitProvider} from "app/shared/measure-unit-provider";

@inject(HttpClient, I18N, Router, MeasureUnitProvider)
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

    addSubrecipe() {
        var newSubrecipe = new QuickRecipeEditionSubrecipe();
        newSubrecipe.id = Math.max.apply(Math, this.recipe.subrecipes.map(x => x.id)) + 1;

        this.subrecipes.push(newSubrecipe);
    }

    removeSubrecipe(subrecipeId: number) {
        var subrecipe = this.subrecipes.filter(subrecipe => subrecipeId === subrecipe.id)[0];

        var index = this.subrecipes.indexOf(subrecipe);
        if (index > -1) {
            this.subrecipes.splice(index, 1);
        }
    }

    addIngredient(subrecipeId: number) {
        var subrecipe = this.subrecipes.filter(subrecipe => subrecipeId === subrecipe.id)[0];

        var newIngredient = new Ingredient();
        newIngredient.id = Math.max.apply(Math, this.recipe.ingredients.map(x => x.id)) + 1;

        subrecipe.ingredients.push(newIngredient);
    }

    removeIngredient(subrecipeId: number, ingredientId: number) {
        var subrecipe = this.subrecipes.filter(subrecipe => subrecipeId === subrecipe.id)[0];
        var ingredient = subrecipe.ingredients.filter(ingredient => ingredientId === ingredient.id)[0];

        var index = subrecipe.ingredients.indexOf(ingredient);
        if (index > -1) {
            subrecipe.ingredients.splice(index, 1);
        }
    }

    addStep(subrecipeId: number) {
        var subrecipe = this.subrecipes.filter(subrecipe => subrecipeId === subrecipe.id)[0];
    }

    saveRecipe() {
        this._http.createRequest(null)
            .withUrl("http://localhost:5000/api/quickrecipe", this.recipe)
            .withHeader("Content-Type", "application/json")
            .asPut()
            .send()
            .then(data => {
                this._router.navigateToRoute("quick-recipe", { "id": this.recipe.id }, undefined);
            });
    }
}

class QuickRecipeEditionSubrecipe {
    id: number;
    title: string;
    steps: Step[] = [];
    ingredients: Ingredient[] = [];
}
