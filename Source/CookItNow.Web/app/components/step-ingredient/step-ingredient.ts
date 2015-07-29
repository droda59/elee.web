import {IngredientPart, Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";

export class StepIngredient {
	private _ingredient: Ingredient;
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	requirements: string;
	
	activate(model: IngredientPart) {
    	this._ingredient = model.ingredient;
		
		this.ingredientName = this._ingredient.name.toLowerCase();
		this.nextWord = (this._ingredient.quantity.originalMeasureUnit !== "unit" ? this.isVowel(this.ingredientName[0]) ? " d'" : " de " : " ");
			
		this.measureUnit = this._ingredient.quantity.originalMeasureUnit;
		this.quantity = new Quantity(this._ingredient.quantity);
		
		this.requirements = (this._ingredient.requirements || []).join(" et ");
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
