import {bindable, inject, ObserverLocator} from "aurelia-framework";
import {I18N} from "aurelia-i18n"; 
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {TextUtils}from "shared/text-utils";
import {QuantityConverter}from "shared/quantity-converter";
import {SettingsManager}from "shared/settings-manager";

@inject (I18N, ObserverLocator, QuantityConverter, SettingsManager)
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
	private _settingsObserver;
	
	constructor(i18n: I18N, observerLocator: ObserverLocator, quantityConverter: QuantityConverter, settingsManager: SettingsManager) {
		this._i18n = i18n;
		this._quantityConverter = quantityConverter;
		
		this._settingsObserver = observerLocator
			.getObserver(settingsManager, 'settings')
			.subscribe(newVal => {
				this.calculateConvertibleMeasureUnits();
			});
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
		
		this.calculateConvertibleMeasureUnits();
	}
	
	deactivate () {
		this._settingsObserver();
	}
	
	private calculateConvertibleMeasureUnits() {
		this.convertibleMeasureUnits = this._quantityConverter.getValidConvertibleMeasureUnits(this.quantity, this.measureUnit);
        this.isConvertible = this.convertibleMeasureUnits.length > 1;
	}
}
