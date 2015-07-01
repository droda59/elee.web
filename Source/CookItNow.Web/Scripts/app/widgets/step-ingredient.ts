import {Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";
import {IngredientFormatValueConverter} from "value-converters/ingredient-format";
import {computedFrom} from "aurelia-framework"; 

export class StepIngredient {
	quantity: Quantity;
	measureUnit: string;
	nextWord: string;
	ingredientName: string;
	ingredient: Ingredient;
	private ingredientValueConverter: IngredientFormatValueConverter;
	
	constructor() {
		this.ingredientValueConverter = new IngredientFormatValueConverter();
	}
	
	activate(model: Ingredient) {
        this.ingredient = model;
		
		this.ingredientName = model.name.toLowerCase();
		this.nextWord = this.ingredientValueConverter.isVowel(this.ingredientName[0]) ? " d'" : " de ";
			
		this.measureUnit = model.quantity.originalMeasureUnit;
		this.quantity = new Quantity();
		this.quantity.originalMeasureUnit = model.quantity.originalMeasureUnit;
		this.quantity.value = model.quantity.value;
	}
    
    @computedFrom("measureUnit")
    get localizedMeasureUnit() {
		var value = this.quantity.getQuantity(this.measureUnit);
		var unit = this.ingredientValueConverter.getLocalizedMeasureUnit(this.measureUnit, value);
		
		return unit;
    }
}
