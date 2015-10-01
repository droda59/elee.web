import {bindable, inject, ObserverLocator} from "aurelia-framework";
import {I18N} from "aurelia-i18n"; 
import {Ingredient} from "shared/models/ingredient";
import {TextUtils}from "shared/text-utils";
import {QuantityConverter}from "shared/quantity-converter";
import {SettingsManager}from "shared/settings-manager";

@inject (I18N, ObserverLocator, QuantityConverter, SettingsManager)
export class MeasurableIngredient {
	@bindable ingredient: Ingredient = null;
	
	showBoth: boolean;
	nextWord: string;
	ingredientName: string;
	convertibleMeasureUnit: {} = {};
	offConvertibleMeasureUnit: {} = {};
	
	private _quantity: number;
	private _measureUnit: string;
	private _i18n: I18N;
	private _quantityConverter: QuantityConverter;
	private _settingsManager: SettingsManager;
	private _settingsObserver;
	
	constructor(i18n: I18N, observerLocator: ObserverLocator, quantityConverter: QuantityConverter, settingsManager: SettingsManager) {
		this._i18n = i18n;
		this._quantityConverter = quantityConverter;
		this._settingsManager = settingsManager;
		
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
			
		this._measureUnit = this.ingredient.quantity.originalMeasureUnit;
		this._quantity = this.ingredient.quantity.value;
		
		this.calculateConvertibleMeasureUnits();
	}
	
	deactivate () {
		this._settingsObserver();
	}
	
	private calculateConvertibleMeasureUnits() {
		this.convertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this._quantity, this._measureUnit);
		 
		if (this._settingsManager.settings.selectedVolumeOption === "metric" && this._settingsManager.settings.metricVolumeOption === "showBoth") {
			this.offConvertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this._quantity, this._measureUnit, true);
			this.showBoth = this.offConvertibleMeasureUnit["unit"] !== this.convertibleMeasureUnit["unit"];
		} else {
			this.showBoth = false;
		}
	}
}
