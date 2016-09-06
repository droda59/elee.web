import {autoinject} from "aurelia-framework";
import {IngredientPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe-page";

@autoinject()
export class StepIngredient {
    ingredient: Ingredient;
    possibleIngredients: Ingredient[] = [];
    parentelement: EditRecipePage;
    convertibleMeasureUnit: Quantity;

    constructor(parentelement: EditRecipePage){
        this.parentelement = parentelement;
    }

    activate(model: IngredientPart) {
        this.ingredient = model.ingredient;

        var subrecipe = this.parentelement.subrecipes.filter(subrecipe => this.ingredient.subrecipeId === subrecipe.id)[0];
        this.possibleIngredients = subrecipe.ingredients;
    }
}
