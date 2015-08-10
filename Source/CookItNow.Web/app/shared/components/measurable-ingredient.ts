import {bindable} from "aurelia-framework"; 
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {TextUtils}from "shared/text-utils";

export class MeasurableIngredient {
	@bindable ingredient: Ingredient = null;
	
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	requirements: string;
	
	bind() {
		this.ingredientName = this.ingredient.name.toLowerCase();
		this.nextWord = (this.ingredient.quantity.originalMeasureUnit !== "unit" ? TextUtils.isVowel(this.ingredientName[0]) ? " d'" : " de " : " ");
			
		this.measureUnit = this.ingredient.quantity.originalMeasureUnit;
		this.quantity = new Quantity(this.ingredient.quantity);
		
		this.requirements = (this.ingredient.requirements || []).join(" et ");
	}
}
