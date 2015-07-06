import {Ingredient} from "models/quick-recipe";
import {QuantityPluralFormatValueConverter} from "value-converters/quantity-plural-format";

export class IngredientFormatValueConverter {
	toView(value: Ingredient) {
		var quantityPluralFormatConverter = new QuantityPluralFormatValueConverter();
		var ingredientName = value.name.toLowerCase();
		var nextWord = this.isVowel(ingredientName[0]) ? " d'" : " de ";
			
		var measureUnit = value.quantity.originalMeasureUnit;
		var quantity = value.quantity.value;
		var localizedMeasureUnit = quantityPluralFormatConverter.toView(measureUnit, quantity);
		
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
}