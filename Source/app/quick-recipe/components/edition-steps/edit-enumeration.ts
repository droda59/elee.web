import {autoinject} from "aurelia-framework";
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
        this.ingredients = model.ingredients || [];
        this.possibleIngredients = this.parentelement.subrecipes.selectMany(x => x.ingredients);
    }

    addIngredient(): void {
        var newIngredient = new Ingredient();

        this.ingredients.push(this.possibleIngredients[0]);
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
