import {Quantity} from "app/shared/models/quantity";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Gram} from "app/shared/models/measure-units/gram";

export class QuantityConverter {
    private _imperialShortVolumeMeasureUnits: MeasureUnit[] = [];
    private _imperialCompleteVolumeMeasureUnits: MeasureUnit[] = [];

    private _metricShortVolumeMeasureUnits: MeasureUnit[] = [];
    private _metricCompleteVolumeMeasureUnits: MeasureUnit[] = [];

    private _imperialShortWeightMeasureUnits: MeasureUnit[] = [];
    private _imperialCompleteWeightMeasureUnits: MeasureUnit[] = [];

    private _metricShortWeightMeasureUnits: MeasureUnit[] = [];
    private _metricCompleteWeightMeasureUnits: MeasureUnit[] = [];

    private _volumeMeasureUnits: MeasureUnit[] = [];
    private _weightMeasureUnits: MeasureUnit[] = [];

    private _allMeasureUnits: MeasureUnit[] = [
        Cup.instance, FluidOunce.instance, Tablespoon.instance, Teaspoon.instance,
        Litre.instance, Decilitre.instance, Centilitre.instance, Millilitre.instance,
        Pound.instance, Ounce.instance,
        Kilogram.instance, Gram.instance ];

    constructor() {
        this._imperialShortVolumeMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "imperial" && unit.type === "volume" && unit.isShortUnit);
        this._imperialCompleteVolumeMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "imperial" && unit.type === "volume");

        this._metricShortVolumeMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "metric" && unit.type === "volume" && unit.isShortUnit);
        this._metricCompleteVolumeMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "metric" && unit.type === "volume");

        this._imperialShortWeightMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "imperial" && unit.type === "weight" && unit.isShortUnit);
        this._imperialCompleteWeightMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "imperial" && unit.type === "weight");

        this._metricShortWeightMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "metric" && unit.type === "weight" && unit.isShortUnit);
        this._metricCompleteWeightMeasureUnits = this._allMeasureUnits.filter(unit => unit.system === "metric" && unit.type === "weight");

        this._volumeMeasureUnits = this._allMeasureUnits.filter(unit => unit.type === "volume");
        this._weightMeasureUnits = this._allMeasureUnits.filter(unit => unit.type === "weight");
    }

    getBestConvertibleMeasureUnit(quantity: Quantity, displayUnit: string): Quantity {
        var bestConvertibleQuantity = new Quantity();
        bestConvertibleQuantity.value = quantity.value;
        bestConvertibleQuantity.unit = quantity.unit;
        bestConvertibleQuantity.format = quantity.format;

        var isValid: boolean = false;
        var unitsToConvertTo: MeasureUnit[] = this.getUnitsToConvertTo(quantity.unit, displayUnit);
        if (quantity.formatUnit && unitsToConvertTo.indexOf(quantity.unit) < 0) {
            unitsToConvertTo = [ quantity.formatUnit ];
        }

        unitsToConvertTo.some(unit => {
            var value = this.getConvertedValue(quantity, unit);
            isValid = unit.isValidConvertibleMeasureUnit(value);

            if (isValid) {
                bestConvertibleQuantity.value = value;
                bestConvertibleQuantity.unit = unit;
            }

            return isValid;
        });

        if (!isValid) {
            unitsToConvertTo = this.getUnitsToConvertTo(quantity.unit, displayUnit, true);
            unitsToConvertTo.some(unit => {
                var value = this.getConvertedValue(quantity, unit);
                isValid = unit.isValidConvertibleMeasureUnit(value);

                if (isValid) {
                    bestConvertibleQuantity.value = value;
                    bestConvertibleQuantity.unit = unit;
                }

                return isValid;
            });
        }

        return bestConvertibleQuantity;
    }

    private isVolumeUnit(measureUnit: MeasureUnit): boolean {
        return measureUnit.type === "volume";
    }

    private isWeightUnit(measureUnit: MeasureUnit): boolean {
        return measureUnit.type === "weight";
    }

    private getUnitsToConvertTo(originalMeasureUnit: MeasureUnit, displayUnit: string, forceCompleteUnits?: boolean): MeasureUnit[] {
        if (this.isVolumeUnit(originalMeasureUnit)) {
            if (forceCompleteUnits) {
                if (displayUnit === "imperialShort" || displayUnit === "imperialComplete") {
                    return this._imperialCompleteVolumeMeasureUnits;
                } else if (displayUnit === "metricShort" || displayUnit === "metricComplete") {
                    return this._metricCompleteVolumeMeasureUnits;
                }
            }

            if (displayUnit === "imperialShort") {
                return this._imperialShortVolumeMeasureUnits;
            } else if (displayUnit === "imperialComplete") {
                return this._imperialCompleteVolumeMeasureUnits;
            } else if (displayUnit === "metricShort") {
                return this._metricShortVolumeMeasureUnits;
            } else if (displayUnit === "metricComplete") {
                return this._metricCompleteVolumeMeasureUnits;
            }
        } else if (this.isWeightUnit(originalMeasureUnit)) {
            if (forceCompleteUnits) {
                if (displayUnit === "imperialShort" || displayUnit === "imperialComplete") {
                    return this._imperialCompleteWeightMeasureUnits;
                } else if (displayUnit === "metricShort" || displayUnit === "metricComplete") {
                    return this._metricCompleteWeightMeasureUnits;
                }
            }

            if (displayUnit === "imperialShort") {
                return this._imperialShortWeightMeasureUnits;
            } else if (displayUnit === "imperialComplete") {
                return this._imperialCompleteWeightMeasureUnits;
            } else if (displayUnit === "metricShort") {
                return this._metricShortWeightMeasureUnits;
            } else if (displayUnit === "metricComplete") {
                return this._metricCompleteWeightMeasureUnits;
            }
        }

        return [];
    }

    private getConvertedValue(quantity: Quantity, targetUnit: MeasureUnit): number {
        var value = quantity.value * quantity.unit.getConversionRate(targetUnit.abbreviation);
        var approximatedValue = targetUnit.roundValue(value);

        return approximatedValue;
    }
}
