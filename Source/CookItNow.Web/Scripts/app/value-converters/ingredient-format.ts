import {Ingredient} from "interfaces/quick-recipe";

export class IngredientFormatValueConverter {
	toView(value: Ingredient) {
		var ingredientName = value.name.toLowerCase();
		var nextWord = this.isVowell(ingredientName[0]) ? " d'" : " de ";
			
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
	
	isVowell(letter: string):boolean {
		return letter === "a" 
			|| letter === "e"
			|| letter === "i"
			|| letter === "o"
			|| letter === "u"
			|| letter === "h";
	}
	
	getLocalizedMeasureUnit(originalMeasureUnit: string, quantity: number):string {
		switch (originalMeasureUnit) {
			case "cups":
				return " tasse" + (quantity > 1 ? "s" : "");
				break;
				
			case "ml":
				return "ml";
				break;
				
			case "pinch":
				return " pincée" + (quantity > 1 ? "s" : "");
				break;
		
			case "units":
				return "";
				break;
				
			default:
				return "";
				break;
		};
	}
}