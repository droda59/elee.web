import {Quantity} from "shared/models/quantity";
import {MeasureUnit} from "shared/models/measure-units/measure-unit";
import {Cup} from "shared/models/measure-units/cup";
import {LiquidOunce} from "shared/models/measure-units/liquid-ounce";
import {Tablespoon} from "shared/models/measure-units/tablespoon";
import {Teaspoon} from "shared/models/measure-units/teaspoon";
import {Litre} from "shared/models/measure-units/litre";
import {Decilitre} from "shared/models/measure-units/decilitre";
import {Centilitre} from "shared/models/measure-units/centilitre";
import {Millilitre} from "shared/models/measure-units/millilitre";
import {Pound} from "shared/models/measure-units/pound";
import {Ounce} from "shared/models/measure-units/ounce";
import {Kilogram} from "shared/models/measure-units/kilogram";
import {Gram} from "shared/models/measure-units/gram";

export class QuantityConverter {
    private _imperialShortVolumeMeasureUnits: MeasureUnit[] = [ Cup.instance, Tablespoon.instance, Teaspoon.instance ];
    private _imperialCompleteVolumeMeasureUnits: MeasureUnit[] = [ Cup.instance, LiquidOunce.instance, Tablespoon.instance, Teaspoon.instance ];

    private _metricShortVolumeMeasureUnits: MeasureUnit[] = [ Litre.instance, Millilitre.instance ];
    private _metricCompleteVolumeMeasureUnits: MeasureUnit[] = [ Litre.instance, Decilitre.instance, Centilitre.instance, Millilitre.instance ];

    private _imperialShortWeightMeasureUnits: MeasureUnit[] = [ Pound.instance ];
    private _imperialCompleteWeightMeasureUnits: MeasureUnit[] = [ Pound.instance, Ounce.instance ];

    private _metricShortWeightMeasureUnits: MeasureUnit[] = [ Gram.instance ];
    private _metricCompleteWeightMeasureUnits: MeasureUnit[] = [ Kilogram.instance, Gram.instance ];

    private _volumeMeasureUnits: MeasureUnit[] = [];
    private _weightMeasureUnits: MeasureUnit[] = [];
    private _allMeasureUnits: MeasureUnit[] = [];

    constructor() {
        this._volumeMeasureUnits = this._imperialCompleteVolumeMeasureUnits.concat(this._metricCompleteVolumeMeasureUnits);
        this._weightMeasureUnits = this._imperialCompleteWeightMeasureUnits.concat(this._metricCompleteWeightMeasureUnits);
        this._allMeasureUnits = this._volumeMeasureUnits.concat(this._weightMeasureUnits);
    }

    getBestConvertibleMeasureUnit(quantity: Quantity, displayUnit: string): Quantity {
        var bestConvertibleQuantity = new Quantity();
        bestConvertibleQuantity.value = quantity.value;
        bestConvertibleQuantity.unit = quantity.unit;
        bestConvertibleQuantity.format = quantity.format;

        var isValid: boolean = false;
        var unitsToConvertTo: MeasureUnit[] = this.getUnitsToConvertTo(quantity.unit, displayUnit);
        if (quantity.formatUnit && unitsToConvertTo.map(unit => unit.abbreviation).indexOf(quantity.unit) < 0) {
            unitsToConvertTo = unitsToConvertTo.filter(unit => unit.abbreviation === quantity.formatUnit);
        }

        unitsToConvertTo.some(unit => {
            var value = this.getConvertedValue(quantity, unit);
            isValid = unit.isValidConvertibleMeasureUnit(value);

            if (isValid) {
                bestConvertibleQuantity.value = value;
                bestConvertibleQuantity.unit = unit.abbreviation;
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
                    bestConvertibleQuantity.unit = unit.abbreviation;
                }

                return isValid;
            });
        }

        return bestConvertibleQuantity;
    }

    isVolumeUnit(measureUnitAbbreviation: string): boolean {
        return this._volumeMeasureUnits.map(unit => unit.abbreviation).indexOf(measureUnitAbbreviation) > -1;
    }

    isWeightUnit(measureUnitAbbreviation: string): boolean {
        return this._weightMeasureUnits.map(unit => unit.abbreviation).indexOf(measureUnitAbbreviation) > -1;
    }

    private getUnitsToConvertTo(originalMeasureUnit: string, displayUnit: string, forceCompleteUnits?: boolean): MeasureUnit[] {
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
        var sourceUnit = this._allMeasureUnits.filter(unit => unit.abbreviation == quantity.unit)[0];

        var value = quantity.value * sourceUnit.getConversionRate(targetUnit.abbreviation);
        var approximatedValue = targetUnit.roundValue(value);

        return approximatedValue;
    }
}
