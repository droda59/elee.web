import {bindable, inject} from "aurelia-framework";
import {I18N} from 'aurelia-i18n'; 
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {TextUtils}from "shared/text-utils";

@inject (I18N)
export class MeasurableIngredient {
	@bindable ingredient: Ingredient = null;
	
	measureUnit: string;
	quantity: Quantity;
	nextWord: string;
	ingredientName: string;
	
	private _i18n: I18N;
	
	constructor(i18n: I18N) {
		this._i18n = i18n;
	}
	
	bind() {
		this.ingredientName = this.ingredient.name.toLowerCase();
		this.nextWord = " " + (this.ingredient.quantity.originalMeasureUnit !== "unit" 
			? TextUtils.isVowel(this.ingredientName[0]) 
				? this._i18n.tr("quantities.nextWordVowel") 
				: this._i18n.tr("quantities.nextWordConsonant") + " " 
			: "");
			
		this.measureUnit = this.ingredient.quantity.originalMeasureUnit;
		this.quantity = new Quantity(this.ingredient.quantity);
	}
}
