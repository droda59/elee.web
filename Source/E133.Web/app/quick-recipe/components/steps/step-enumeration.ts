import {IngredientEnumerationPart} from "quick-recipe/models/quick-recipe";
import {Ingredient} from "shared/models/ingredient";

export class StepEnumeration {
	ingredients: Ingredient[];
	
	activate(model: IngredientEnumerationPart) {
    	this.ingredients = model.ingredients;
	}
}
