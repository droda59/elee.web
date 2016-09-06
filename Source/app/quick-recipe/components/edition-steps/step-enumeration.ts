import {IngredientEnumerationPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe-page";

@autoinject()
export class StepEnumeration {
    ingredients: Ingredient[];
    possibleIngredients: Ingredient[] = [];
    parentelement: EditRecipePage;

    constructor(parentelement: EditRecipePage){
        this.parentelement = parentelement;
    }

    activate(model: IngredientEnumerationPart) {
        this.ingredients = model.ingredients;

        var usedSubrecipes = this.ingredients.map(ingredient => ingredient.subrecipeId);
        var subrecipe = this.parentelement.subrecipes.filter(subrecipe => usedSubrecipes.contains(subrecipe.id))[0];
        this.possibleIngredients = subrecipe.ingredients;
    }

    removeIngredient(ingredient: Ingredient): void {
        this._removeFromArray(this.ingredients, ingredient);
    }

    private _removeFromArray(array: any[], object: any): void {
        var index = array.indexOf(object);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}
