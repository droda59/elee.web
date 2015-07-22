import {bindable} from "aurelia-framework"; 
import {Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";

export class MeasurableIngredient {
	@bindable ingredient: Ingredient = null;
	
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	requirements: string;
	
	bind() {
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
