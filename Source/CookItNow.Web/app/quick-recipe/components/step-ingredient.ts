import {IngredientPart} from "quick-recipe/models/quick-recipe";
import {Quantity} from "shared/models/quantity";
import {Ingredient} from "shared/models/ingredient";
import {TextUtils} from "shared/text-utils";

export class StepIngredient {
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	requirements: string;
	
	private _ingredient: Ingredient;
	
	activate(model: IngredientPart) {
    	this._ingredient = model.ingredient;
		
		this.ingredientName = this._ingredient.name.toLowerCase();
		this.nextWord = (this._ingredient.quantity.originalMeasureUnit !== "unit" ? TextUtils.isVowel(this.ingredientName[0]) ? " d'" : " de " : " ");
			
		this.measureUnit = this._ingredient.quantity.originalMeasureUnit;
		this.quantity = new Quantity(this._ingredient.quantity);
		
		this.requirements = (this._ingredient.requirements || []).join(" et ");
	}
}
