import {autoinject} from "aurelia-framework";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe/index";
import {IngredientPart, IngredientEnumerationPart} from "app/quick-recipe/shared/models/quick-recipe";
import {PartFactory} from "app/quick-recipe/shared/part-factory";

@autoinject()
export class StepEnumeration {
    part: IngredientEnumerationPart;
    possibleIngredients: Array<Ingredient> = [];
    parentelement: EditRecipePage;

    constructor(parentelement: EditRecipePage){
        this.parentelement = parentelement;
    }

    activate(model: IngredientEnumerationPart) {
        this.part = model;

        var step = this.parentelement.findStep(this.part.stepId);
        this.possibleIngredients = this.parentelement.ingredients.filter(ingredient => step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }

    addIngredient(): void {
        var part = PartFactory.createPart(this.part.stepId, IngredientPart.type);
        part.ingredient = this.possibleIngredients[0];

        this.part.ingredients.push(part);
    }

    removeIngredient(ingredientPart: IngredientPart): void {
        this.part.ingredients.removeFromArray(ingredientPart);
    }
}
