import {IngredientEnumerationPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";

export class StepEnumeration {
	ingredients: Ingredient[];

	activate(model: IngredientEnumerationPart) {
    	this.ingredients = model.ingredients;
	}
}
