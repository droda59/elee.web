import {Ingredient} from "models/quick-recipe";

export class IngredientFormatValueConverter {
	toView(value: Ingredient) {
		var ingredientName = value.name.toLowerCase();
		var nextWord = this.isVowel(ingredientName[0]) ? " d'" : " de ";
			
		var measureUnit = value.quantity.originalMeasureUnit;
		var quantity = value.quantity.value;
		var localizedMeasureUnit = this.getLocalizedMeasureUnit(measureUnit, quantity);
		
		var requirements = value.requirements;
		if (requirements) {
			for (var i = 0; i < requirements.length; i++) {
				requirements[i] = requirements[i].toLowerCase();
			}
		}
		
		return quantity 
			+ localizedMeasureUnit 
			+ (measureUnit !== "units" ? nextWord : " ") 
			+ ingredientName
			+ (requirements ? ", " + requirements.join(" et ") : "");
	}
	
	isVowel(letter: string):boolean {
		return letter === "a" || letter === "A"
			|| letter === "e" || letter === "E"
			|| letter === "i" || letter === "I"
			|| letter === "o" || letter === "O"
			|| letter === "u" || letter === "U"
			|| letter === "h" || letter === "H";
	}
	
	getLocalizedMeasureUnit(originalMeasureUnit: string, quantity: number):string {
		switch (originalMeasureUnit) {
			case "cups":
				return " tasse" + (quantity > 1 ? "s" : "");
				
			case "ml":
				return "ml";
				
			case "pinch":
				return " pincée" + (quantity > 1 ? "s" : "");
		
			case "units":
				return "";
				
			default:
				return "";
		};
	}
}