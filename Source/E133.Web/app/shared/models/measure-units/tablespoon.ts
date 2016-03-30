import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Tablespoon extends MeasureUnit {
    constructor() {
        super("tbsp", "volume", "imperial", true);
    }

    static get instance(): Tablespoon {
        Tablespoon._instance = Tablespoon._instance || new Tablespoon();
        return Tablespoon._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
            case "ml": return 15;
            case "cl": return 1.5;
            case "dl": return 0.15;
            case "l": return 0.015;
            case "tsp": return 3;
            case "tbsp": return 1;
            case "floz": return 0.5;
            case "cup": return 0.0625;
        }
    }

    roundValue(value: number): number {
        var firstDecimalPlaceRound = Math.round(value * 10) / 10;
        if (firstDecimalPlaceRound === 0.5) { return 0.5; }
        else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return Math.trunc(firstDecimalPlaceRound); }

        return value;
    }

    isValidConvertibleMeasureUnit(value: number): boolean {
        var decimal = this.getDecimal(value);

        return value === 0.5
            || (value >= 1 && value <= 6 && decimal >= 0 && decimal <= 0.1);
    }
}
