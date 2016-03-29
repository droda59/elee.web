import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class Pound extends MeasureUnit {
    constructor() {
        super("lb", "weight", "imperial", true);
    }

    static get instance(): Pound {
        Pound._instance = Pound._instance || new Pound();
        return Pound._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
            case "g": return 454;
            case "kg": return 0.454;
            case "lb": return 1;
            case "oz": return 16;
        }
    }

    roundValue(value: number): number {
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

    isValidConvertibleMeasureUnit(value: number): boolean {
        var decimal = this.getDecimal(value);

        return decimal === 0
            || decimal === 0.25 || decimal === 0.333
            || decimal === 0.5 || decimal === 0.666
            || decimal === 0.75;
    }
}
