import {IngredientPart} from "models/quick-recipe";
import {Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";

export class StepIngredient2 {
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	ingredient: Ingredient;
	requirements: string;
	
	activate(model) {
		if (model.ingredient) {
        	this.ingredient = model.ingredient;
		} else {
			this.ingredient = model
		}
		
		this.ingredientName = this.ingredient.name.toLowerCase();
		this.nextWord = (this.ingredient.quantity.originalMeasureUnit !== "units" ? this.isVowel(this.ingredientName[0]) ? " d'" : " de " : " ");
			
		this.measureUnit = this.ingredient.quantity.originalMeasureUnit;
		this.quantity = new Quantity(this.ingredient.quantity);
		
		this.requirements = (this.ingredient.requirements || []).join(" et ");
	}
	
	private isVowel(letter: string):boolean {
		return letter === "a" || letter === "A"
			|| letter === "e" || letter === "E"
			|| letter === "i" || letter === "I"
			|| letter === "o" || letter === "O"
			|| letter === "u" || letter === "U"
			|| letter === "h" || letter === "H";
	}
}
