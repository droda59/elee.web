import {Ingredient} from "models/quick-recipe";
import {Quantity} from "models/quantity";
import {IngredientFormatValueConverter} from "value-converters/ingredient-format";
import {computedFrom} from "aurelia-framework"; 

export class StepIngredient {
	private _ingredientValueConverter: IngredientFormatValueConverter;
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	ingredient: Ingredient;
	
	constructor() {
		this._ingredientValueConverter = new IngredientFormatValueConverter();
	}
	
	activate(model: Ingredient) {
        this.ingredient = model;
		
		this.ingredientName = model.name.toLowerCase();
		this.nextWord = this._ingredientValueConverter.isVowel(this.ingredientName[0]) ? " d'" : " de ";
			
		this.measureUnit = model.quantity.originalMeasureUnit;
		this.quantity = new Quantity(model.quantity);
	}
	
	localizedMeasureUnitFor(unit: string) {
		return this._ingredientValueConverter.getLocalizedMeasureUnit(unit, this.quantity.getQuantity(unit));
	}
    
	@computedFrom("measureUnit")
    get localizedMeasureUnit():string {
		var value = this.quantity.getQuantity(this.measureUnit);
		var unit = this._ingredientValueConverter.getLocalizedMeasureUnit(this.measureUnit, value);
		
		return unit;
    }
}
