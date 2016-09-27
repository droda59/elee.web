import {autoinject} from "aurelia-framework";
import {IngredientEnumerationPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe-page";
import {PartFactory, IngredientPart} from "app/quick-recipe/models/quick-recipe";

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

    removeIngredient(ingredient: Ingredient): void {
        this._removeFromArray(this.part.ingredients, ingredient);
    }

    private _removeFromArray(array: any[], object: any): void {
        var index = array.indexOf(object);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}
