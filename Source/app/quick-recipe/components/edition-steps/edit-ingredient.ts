import {autoinject} from "aurelia-framework";
import {IngredientPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe-page";

@autoinject()
export class StepIngredient {
    part: IngredientPart;
    possibleIngredients: Array<Ingredient> = [];
    parentelement: EditRecipePage;

    constructor(parentelement: EditRecipePage){
        this.parentelement = parentelement;
    }

    activate(model: IngredientPart) {
        this.part = model;

        var step = this.parentelement.findStep(model.stepId);
        this.possibleIngredients = this.parentelement.ingredients.filter(ingredient => step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }
}
