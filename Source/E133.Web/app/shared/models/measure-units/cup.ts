import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class Cup extends MeasureUnit {
    constructor() {
        super("cup", "volume", "imperial", true);
    }

    static get instance(): Cup {
        Cup._instance = Cup._instance || new Cup();
        return Cup._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
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

    roundValue(value: number): number {
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

    isValidConvertibleMeasureUnit(value: number): boolean {
        var decimal = this.getDecimal(value);
        var intValue = this.getInteger(value);

        return decimal === 0 || (intValue > 0 && decimal === 0.125)
            || decimal === 0.25 || decimal === 0.333
            || decimal === 0.375 || decimal === 0.5 || decimal === 0.666
            || decimal === 0.625 || decimal === 0.75 || decimal === 0.875;
    }
}
