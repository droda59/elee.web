import {Quantity} from "shared/models/quantity";

export class QuantityConverter {
    private _imperialShortVolumeMeasureUnits: string[] = [ "cup", "tbsp", "tsp" ];
    private _imperialCompleteVolumeMeasureUnits: string[] = [ "cup", "floz", "tbsp", "tsp" ];

    private _metricShortVolumeMeasureUnits: string[] = [ "l", "ml" ];
    private _metricCompleteVolumeMeasureUnits: string[] = [ "l", "dl", "cl", "ml" ];

    private _imperialShortWeightMeasureUnits: string[] = [ "lb" ];
    private _metricShortWeightMeasureUnits: string[] = [ "g" ];

    private _imperialCompleteWeightMeasureUnits: string[] = [ "lb", "oz" ];
    private _metricCompleteWeightMeasureUnits: string[] = [ "kg", "g" ];

    volumeMeasureUnits: string[] = [ "cup", "floz", "tbsp", "tsp", "l", "dl", "cl", "ml" ];
    weightMeasureUnits: string[] = [ "lb", "oz", "kg", "g" ];

    getBestConvertibleMeasureUnit(quantity: Quantity, displayUnit: string): Quantity {
        var bestConvertibleQuantity = new Quantity();
        bestConvertibleQuantity.value = quantity.value;
        bestConvertibleQuantity.unit = quantity.unit;
        bestConvertibleQuantity.format = quantity.format;

        var isValid: boolean = false;
        var unitsToConvertTo: string[] = this.getUnitsToConvertTo(quantity.unit, displayUnit);
        if (quantity.formatUnit && unitsToConvertTo.indexOf(quantity.unit) < 0) {
            unitsToConvertTo = [ quantity.formatUnit ]
        }

        unitsToConvertTo.some(unit => {
            var value = this.getConvertedValue(quantity, unit);
            isValid = this.isValidConvertibleMeasureUnit(value, unit);

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
                isValid = this.isValidConvertibleMeasureUnit(value, unit);

                if (isValid) {
                    bestConvertibleQuantity.value = value;
                    bestConvertibleQuantity.unit = unit;
                }

                return isValid;
            });
        }

        return bestConvertibleQuantity;
    }

    private getUnitsToConvertTo(originalMeasureUnit: string, displayUnit: string, forceCompleteUnits?: boolean): string[] {
        var isVolumeUnit = this.volumeMeasureUnits.indexOf(originalMeasureUnit) > -1;
        var isWeightUnit = this.weightMeasureUnits.indexOf(originalMeasureUnit) > -1;

        if (isVolumeUnit) {
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
        } else if (isWeightUnit) {
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

    private getConvertedValue(quantity: Quantity, measureUnit: string): number {
        var value = quantity.value * this.getQuantityConversion(quantity.unit, measureUnit);
        var approximatedValue = this.getApproximatedValue(value, measureUnit);

        return approximatedValue;
    }

    private getQuantityConversion(fromUnit: string, toUnit: string): number {
        if (fromUnit === "ml") {
            switch (toUnit) {
                case "ml": return 1;
                case "cl": return 0.1;
                case "dl": return 0.01;
                case "l": return 0.001;
                case "tsp": return 0.202884;
                case "tbsp": return 0.067628;
                case "floz": return 0.0351951;
                case "cup": return 0.004; // 0.004226;
            }
        }
        else if (fromUnit === "cl") {
            switch (toUnit) {
                case "ml": return 10;
                case "cl": return 1;
                case "dl": return 0.1;
                case "l": return 0.01;
                case "tsp": return 2.028841;
                case "tbsp": return 0.676280;
                case "floz": return 0.351951;
                case "cup": return 0.04; // 0.042267;
            }
        }
        else if (fromUnit === "dl") {
            switch (toUnit) {
                case "ml": return 100;
                case "cl": return 10;
                case "dl": return 1;
                case "l": return 0.1;
                case "tsp": return 20.288413;
                case "tbsp": return 6.762804;
                case "floz": return 3.51951;
                case "cup": return 0.4; // 0.422675;
            }
        }
        else if (fromUnit === "l") {
            switch (toUnit) {
                case "ml": return 1000;
                case "cl": return 100;
                case "dl": return 10;
                case "l": return 1;
                case "tsp": return 202.884136;
                case "tbsp": return 67.628045;
                case "floz": return 35.1951;
                case "cup": return 4; // 4.226752;
            }
        }
        else if (fromUnit === "tsp") {
            switch (toUnit) {
                case "ml": return 4.92892;
                case "cl": return 0.492892;
                case "dl": return 0.049289;
                case "l": return 0.004928;
                case "tsp": return 1;
                case "tbsp": return 0.333333;
                case "floz": return 0.166667;
                case "cup": return 0.0208333;
            }
        }
        else if (fromUnit === "tbsp") {
            switch (toUnit) {
                case "ml": return 14.7868;
                case "cl": return 1.478676;
                case "dl": return 0.147867;
                case "l": return 0.014786;
                case "tsp": return 3;
                case "tbsp": return 1;
                case "floz": return 0.5;
                case "cup": return 0.0625;
            }
        }
        else if (fromUnit === "floz") {
            switch (toUnit) {
                case "ml": return 29.5735;
                case "cl": return 2.9573;
                case "dl": return 0.29573;
                case "l": return 0.02957;
                case "tsp": return 6;
                case "tbsp": return 2;
                case "floz": return 1;
                case "cup": return 0.125;
            }
        }
        else if (fromUnit === "cup") {
            switch (toUnit) {
                case "ml": return 250; // 236.588236;
                case "cl": return 25; // 23.658823;
                case "dl": return 2.5; // 2.365882;
                case "l": return 0.25; // 0.236588;
                case "tsp": return 48;
                case "tbsp": return 16;
                case "floz": return 8;
                case "cup": return 1;
            }
        }
        else if (fromUnit === "g") {
            switch (toUnit) {
                case "g": return 1;
                case "kg": return 0.001;
                case "lb": return 0.0022;
                case "oz": return 0.035274;
            }
        }
        else if (fromUnit === "kg") {
            switch (toUnit) {
                case "g": return 1000;
                case "kg": return 1;
                case "lb": return 2.20264;
                case "oz": return 35.274;
            }
        }
        else if (fromUnit === "lb") {
            switch (toUnit) {
                case "g": return 454;
                case "kg": return 0.454;
                case "lb": return 1;
                case "oz": return 16;
            }
        }
        else if (fromUnit === "oz") {
            switch (toUnit) {
                case "g": return 85;
                case "kg": return 0.085;
                case "lb": return 0.0625;
                case "oz": return 1;
            }
        }

        return 0;
    }

    private getApproximatedValue(value: number, measureUnit: string): number {
        switch(measureUnit) {
            case "ml":
                return Math.round(value * 10) / 10;

            case "cl":
                return Math.round(value);

            case "dl":
                return Math.round(value * 10) / 10;

            case "l":
                return Math.round(value * 100) / 100;

            case "tsp":
            {
                var thirdDecimalPlaceRound = Math.round(value * 1000) / 1000;
                if (thirdDecimalPlaceRound >= 0.120 && thirdDecimalPlaceRound <= 0.130) { return 0.125; }
                else if (thirdDecimalPlaceRound >= 0.370 && thirdDecimalPlaceRound <= 0.380) { return 0.375; }
                else if (thirdDecimalPlaceRound >= 0.620 && thirdDecimalPlaceRound <= 0.630) { return 0.625; }
                else if (thirdDecimalPlaceRound >= 0.870 && thirdDecimalPlaceRound <= 0.880) { return 0.875; }

                var secondDecimalPlaceRound = Math.round(value * 100) / 100;
                if (secondDecimalPlaceRound >= 0.20 && secondDecimalPlaceRound <= 0.26) { return 0.25; }
                else if (secondDecimalPlaceRound >= 0.74 && secondDecimalPlaceRound <= 0.76) { return 0.75; }

                var firstDecimalPlaceRound = Math.round(value * 10) / 10;
                if (firstDecimalPlaceRound === 0.5) { return 0.5; }
                else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return Math.trunc(firstDecimalPlaceRound); }

                return value;
            }

            case "tbsp":
            {
                var firstDecimalPlaceRound = Math.round(value * 10) / 10;
                if (firstDecimalPlaceRound === 0.5) { return 0.5; }
                else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return Math.trunc(firstDecimalPlaceRound); }

                return value;
            }

            case "floz":
                return Math.round(value * 10) / 10;

            case "cup":
            {
                var decimal = this.getDecimal(value);
                var intValue = this.getInteger(value);

                var thirdDecimalPlaceRound = Math.round(decimal * 1000) / 1000;
                if (thirdDecimalPlaceRound >= 0.120 && thirdDecimalPlaceRound <= 0.186) { return 0.125 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.330 && thirdDecimalPlaceRound <= 0.340) { return 0.333 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.370 && thirdDecimalPlaceRound <= 0.380) { return 0.375 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.620 && thirdDecimalPlaceRound <= 0.630) { return 0.625 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.660 && thirdDecimalPlaceRound <= 0.670) { return 0.666 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.870 && thirdDecimalPlaceRound <= 0.880) { return 0.875 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.990 && thirdDecimalPlaceRound <= 1.000) { return 1 + intValue; }

                var secondDecimalPlaceRound = Math.round(decimal * 100) / 100;
                if (secondDecimalPlaceRound >= 0.22 && secondDecimalPlaceRound <= 0.28) { return 0.25 + intValue; }
                else if (secondDecimalPlaceRound >= 0.72 && secondDecimalPlaceRound <= 0.78) { return 0.75 + intValue; }

                var firstDecimalPlaceRound = Math.round(decimal * 10) / 10;
                if (firstDecimalPlaceRound >= 0.45 && firstDecimalPlaceRound <= 0.6) { return 0.5 + intValue; }
                else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return  Math.trunc(firstDecimalPlaceRound); }

                return value;
            }

            case "g":
                return Math.round(value * 10) / 10;

            case "kg":
                return Math.round(value * 10) / 10;

            case "lb":
            {
                var decimal = this.getDecimal(value);
                var intValue = this.getInteger(value);

                var thirdDecimalPlaceRound = Math.round(decimal * 1000) / 1000;
                if (thirdDecimalPlaceRound >= 0.330 && thirdDecimalPlaceRound <= 0.340) { return 0.333 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.660 && thirdDecimalPlaceRound <= 0.670) { return 0.666 + intValue; }
                else if (thirdDecimalPlaceRound >= 0.990 && thirdDecimalPlaceRound <= 1.000) { return 1 + intValue; }

                var secondDecimalPlaceRound = Math.round(decimal * 100) / 100;
                if (secondDecimalPlaceRound >= 0.24 && secondDecimalPlaceRound <= 0.26) { return 0.25 + intValue; }
                else if (secondDecimalPlaceRound >= 0.74 && secondDecimalPlaceRound <= 0.76) { return 0.75 + intValue; }

                var firstDecimalPlaceRound = Math.round(decimal * 10) / 10;
                if (firstDecimalPlaceRound >= 0.45 && firstDecimalPlaceRound <= 0.60) { return 0.5 + intValue; }
                else if (1 - (Math.round((firstDecimalPlaceRound % 1) * 10) / 10) <= 0.1) { return 1 + intValue}
                else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return Math.trunc(firstDecimalPlaceRound); }

                return value;
            }

            case "oz":
                return Math.round(value * 10) / 10;
        }

        return 0;
    }

    private isValidConvertibleMeasureUnit(value: number, measureUnit: string): boolean {
        switch(measureUnit) {
            case "ml":
                return value > 1;

            case "cl":
                return value > 1;

            case "dl":
                return value > 1;

            case "l":
                return value >= 1;

            case "tsp":
                var decimal = this.getDecimal(value);
                return value === 0.125 || value === 0.25
                    || value === 0.375 || value === 0.5
                    || value === 0.625 || value === 0.75
                    || value === 0.875
                    || (value >= 1 && value !== 3 && value < 5 && decimal >= 0 && decimal <= 0.1);

            case "tbsp":
                var decimal = this.getDecimal(value);
                return value === 0.5
                    || (value >= 1 && value <= 6 && decimal >= 0 && decimal <= 0.1);

            case "floz":
                return value >= 1;

            case "cup":
                var decimal = this.getDecimal(value);
                var intValue = this.getInteger(value);
                return decimal === 0 || (intValue > 0 && decimal === 0.125)
                    || decimal === 0.25 || decimal === 0.333
                    || decimal === 0.375 || decimal === 0.5 || decimal === 0.666
                    || decimal === 0.625 || decimal === 0.75 || decimal === 0.875;

            case "g":
                return value > 1;

            case "kg":
                return value >= 1;

            case "lb":
                var decimal = this.getDecimal(value);
                return decimal === 0
                    || decimal === 0.25 || decimal === 0.333
                    || decimal === 0.5 || decimal === 0.666
                    || decimal === 0.75;

            case "oz":
                return value > 1;
        }

        return false;
    }

    private getDecimal(value: number): number {
        return value % 1;
    }

    private getInteger(value: number): number {
        return value - (this.getDecimal(value));
    }
}
