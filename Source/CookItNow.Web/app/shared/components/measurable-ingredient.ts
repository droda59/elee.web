import {bindable, inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n"; 
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {TextUtils}from "shared/text-utils";
import {QuantityConverter}from "shared/quantity-converter";

@inject (I18N, QuantityConverter)
export class MeasurableIngredient {
	@bindable ingredient: Ingredient = null;
	
	quantity: number;
	measureUnit: string;
	nextWord: string;
	ingredientName: string;
	isConvertible: boolean;
	convertibleMeasureUnits: {}[] = [];
	
	private _i18n: I18N;
	private _quantityConverter: QuantityConverter;
	
	constructor(i18n: I18N, quantityConverter: QuantityConverter) {
		this._i18n = i18n;
		this._quantityConverter = quantityConverter;
	}
	
	bind() {
		this.ingredientName = this.ingredient.name.toLowerCase();
		this.nextWord = " " + (this.ingredient.quantity.originalMeasureUnit !== "unit" 
			? TextUtils.isVowel(this.ingredientName[0]) 
				? this._i18n.tr("quantities.nextWordVowel") 
				: this._i18n.tr("quantities.nextWordConsonant") + " " 
			: "");
			
		this.measureUnit = this.ingredient.quantity.originalMeasureUnit;
		this.quantity = this.ingredient.quantity.value;
		
		this.convertibleMeasureUnits = this._quantityConverter.getValidConvertibleMeasureUnits(this.quantity, this.measureUnit);
		
        this.isConvertible = this.convertibleMeasureUnits.length > 1;
	}
}
