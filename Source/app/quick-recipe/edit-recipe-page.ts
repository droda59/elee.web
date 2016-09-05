import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {QuickRecipe} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";

import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Gram} from "app/shared/models/measure-units/gram";
import {Unit} from "app/shared/models/measure-units/unit";
import {Pinch} from "app/shared/models/measure-units/pinch";

@inject(HttpClient, I18N, Router)
export class QuickRecipeEditionSubrecipe {
    recipe: QuickRecipe;
    subrecipes: QuickRecipeSubrecipe[] = [];
    measureUnits: MeasureUnit[] = [];

    private _http: HttpClient;
    private _i18n: I18N;

    constructor(http: HttpClient, i18n: I18N, router: Router) {
        this._http = http;
        this._i18n = i18n;
		this._router = router;

        this.measureUnits.push(Millilitre.instance);
        this.measureUnits.push(Centilitre.instance);
        this.measureUnits.push(Decilitre.instance);
        this.measureUnits.push(Litre.instance);
        this.measureUnits.push(Teaspoon.instance);
        this.measureUnits.push(Tablespoon.instance);
        this.measureUnits.push(FluidOunce.instance);
        this.measureUnits.push(Cup.instance);
        this.measureUnits.push(Pound.instance);
        this.measureUnits.push(Ounce.instance);
        this.measureUnits.push(Gram.instance);
        this.measureUnits.push(Kilogram.instance);
        this.measureUnits.push(Unit.instance);
        this.measureUnits.push(Pinch.instance);
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

    addIngredient(subrecipeId: number) {
        var subrecipe = this.subrecipes.filter(subrecipe => subrecipeId === subrecipe.id)[0];

        subrecipe.ingredients.push(new Ingredient());
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
    steps: Step[];
    ingredients: Ingredient[];
}
