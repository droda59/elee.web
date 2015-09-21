import {IngredientPart} from "quick-recipe/models/quick-recipe";
import {Ingredient} from "shared/models/ingredient";

export class StepIngredient {
	ingredient: Ingredient;
	
	activate(model: IngredientPart) {
    	this.ingredient = model.ingredient;
	}
}
