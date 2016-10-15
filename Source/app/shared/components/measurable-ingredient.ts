import {bindable, inject, ObserverLocator} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Ingredient} from "app/shared/models/ingredient";
import {Quantity} from "app/shared/models/quantity";
import {TextUtils} from "app/shared/text-utils";
import {QuantityConverter} from "app/shared/quantity-converter";
import {SettingsManager} from "app/shared/settings-manager";

@inject(I18N, ObserverLocator, QuantityConverter, SettingsManager)
export class MeasurableIngredient {
  @bindable ingredient: Ingredient = null;
  @bindable quantity: Quantity = null;
  @bindable unit: string = null;

  showBoth: boolean;
  nextWord: string;
  ingredientName: string;
  convertibleMeasureUnit: Quantity;
  offConvertibleMeasureUnit: Quantity;

  private _i18n: I18N;
  private _quantityConverter: QuantityConverter;
  private _settingsManager: SettingsManager;
  private _settingsObserver;
  private _isVolumeUnit: boolean;
  private _isWeightUnit: boolean;

  constructor(i18n: I18N, observerLocator: ObserverLocator, quantityConverter: QuantityConverter, settingsManager: SettingsManager) {
    this._i18n = i18n;
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

    this.ingredientName = this.ingredient.name.toLowerCase();

    // TODO This is a display concern. Move to value-converter if possible
    this.nextWord = " " + (this.quantity.unit.type !== undefined
      ? TextUtils.isVowel(this.ingredientName[0])
        ? this._i18n.tr("quantities.nextWordVowel")
        : this._i18n.tr("quantities.nextWordConsonant") + " "
      : "");

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
