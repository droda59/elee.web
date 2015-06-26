import {Ingredient} from "models/quick-recipe";
import {IngredientFormatValueConverter} from "value-converters/ingredient-format";

export class StepIngredient {
	quantity: number;
	localizedMeasureUnit: string;
	nextWord: string;
	ingredientName: string;
	ingredient: Ingredient;
	
	activate(model: Ingredient) {
        this.ingredient = model;
		
		var ingredientValueConverter = new IngredientFormatValueConverter();
		this.ingredientName = model.name.toLowerCase();
		this.nextWord = ingredientValueConverter.isVowel(this.ingredientName[0]) ? " d'" : " de ";
			
		var measureUnit = model.quantity.originalMeasureUnit;
		this.quantity = model.quantity.value;
		this.localizedMeasureUnit = ingredientValueConverter.getLocalizedMeasureUnit(measureUnit, this.quantity);
	}
}
