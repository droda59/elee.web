import {Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";

export class StepIngredient {
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	ingredient: Ingredient;
	requirements: string;
	
	activate(model: Ingredient) {
        this.ingredient = model;
		
		this.ingredientName = model.name.toLowerCase();
		this.nextWord = (model.quantity.originalMeasureUnit !== "units" ? this.isVowel(this.ingredientName[0]) ? " d'" : " de " : " ");
			
		this.measureUnit = model.quantity.originalMeasureUnit;
		this.quantity = new Quantity(model.quantity);
		
		this.requirements = (model.requirements || []).join(" et ");
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
