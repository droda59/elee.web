import {bindable, inject, ObserverLocator} from "aurelia-framework";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Ingredient} from "app/shared/models/ingredient";
import {Quantity} from "app/shared/models/quantity";
import {QuantityConverter} from "app/shared/quantity-converter";
import {SettingsManager} from "app/shared/settings-manager";

@inject(ObserverLocator, QuantityConverter, SettingsManager)
export class MeasurableIngredient {
    @bindable ingredient: Ingredient = null;
    @bindable quantity: Quantity = null;
    @bindable unit: string = null;

    showBoth: boolean;
    nextWord: string;
    convertibleMeasureUnit: Quantity;
    offConvertibleMeasureUnit: Quantity;

    private _quantityConverter: QuantityConverter;
    private _settingsManager: SettingsManager;
    private _settingsObserver;
    private _isVolumeUnit: boolean;
    private _isWeightUnit: boolean;

    constructor(observerLocator: ObserverLocator, quantityConverter: QuantityConverter, settingsManager: SettingsManager) {
        this._quantityConverter = quantityConverter;
        this._settingsManager = settingsManager;
        this.convertibleMeasureUnit = new Quantity();
        this.offConvertibleMeasureUnit = new Quantity();

        this._settingsObserver = observerLocator
            .getObserver(settingsManager, "settings")
            .subscribe(newVal => {
                var selectedDisplay = this.getSelectedDisplay();
                this.calculateConvertibleMeasureUnits(selectedDisplay);
            });
    }

    bind() {
        this.quantity = this.quantity || this.ingredient.quantity;

        this._isVolumeUnit = this.quantity.unit.type === "volume";
        this._isWeightUnit = this.quantity.unit.type === "weight";

        var selectedDisplay = this.getSelectedDisplay();
        this.calculateConvertibleMeasureUnits(selectedDisplay);
    }

    deactivate() {
        this._settingsObserver();
    }

    private getSelectedDisplay(): string {
        var selectedDisplay;
        if (this._isVolumeUnit) {
            selectedDisplay = this._settingsManager.settings.selectedVolumeDisplay;
        } else if (this._isWeightUnit) {
            selectedDisplay = this._settingsManager.settings.selectedWeightDisplay;
        }

        if (this.unit) {
            selectedDisplay = this.unit;
        }

        return selectedDisplay;
    }

    private calculateConvertibleMeasureUnits(selectedDisplay: string): void {
        if (selectedDisplay === "both") {
            this.convertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this.quantity, "metricShort");
            this.offConvertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this.quantity, "imperialShort");
            this.showBoth = this.offConvertibleMeasureUnit.unit !== this.convertibleMeasureUnit.unit;
        } else {
            this.convertibleMeasureUnit = this._quantityConverter.getBestConvertibleMeasureUnit(this.quantity, selectedDisplay);
            this.showBoth = false;
        }
    }
}
