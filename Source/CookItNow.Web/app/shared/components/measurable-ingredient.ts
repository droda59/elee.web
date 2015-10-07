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
	
	showBoth: boolean;
	nextWord: string;
	ingredientName: string;
	convertibleMeasureUnit: Quantity;
	offConvertibleMeasureUnit: Quantity;
	
	private _quantity: Quantity;
	private _i18n: I18N;
	private _quantityConverter: QuantityConverter;
	private _settingsManager: SettingsManager;
	private _settingsObserver;
	
	constructor(i18n: I18N, observerLocator: ObserverLocator, quantityConverter: QuantityConverter, settingsManager: SettingsManager) {
		this._i18n = i18n;
		this._quantityConverter = quantityConverter;
		this._settingsManager = settingsManager;
		this.convertibleMeasureUnit = new Quantity();
		this.offConvertibleMeasureUnit = new Quantity();
		
		this._settingsObserver = observerLocator
			.getObserver(settingsManager, 'settings')
			.subscribe(newVal => {
				this.calculateConvertibleMeasureUnits(newVal.selectedVolumeDisplay);
			});
	}
	
	bind() {
		this.ingredientName = this.ingredient.name.toLowerCase();
		this.nextWord = " " + (this.ingredient.quantity.unit !== "unit" 
			? TextUtils.isVowel(this.ingredientName[0]) 
				? this._i18n.tr("quantities.nextWordVowel") 
				: this._i18n.tr("quantities.nextWordConsonant") + " " 
			: "");
			
		this._quantity = this.ingredient.quantity;
		
		var selectedVolumeDisplay = this._settingsManager.settings.selectedVolumeDisplay;
		this.calculateConvertibleMeasureUnits(selectedVolumeDisplay);
	}
	
	deactivate () {
		this._settingsObserver();
	}
	
	private calculateConvertibleMeasureUnits(selectedVolumeDisplay: string) {
		if (selectedVolumeDisplay === "both") {
			this.convertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this._quantity, "metricShort");
			this.offConvertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this._quantity, "imperialShort");
			this.showBoth = this.offConvertibleMeasureUnit["unit"] !== this.convertibleMeasureUnit["unit"];
		} else {
			this.convertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this._quantity);
			this.showBoth = false;
		}
	}
}
