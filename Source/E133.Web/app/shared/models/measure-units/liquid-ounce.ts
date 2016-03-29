import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class LiquidOunce extends MeasureUnit {
    constructor() {
        super("floz", "volume", "imperial");
    }

    static get instance(): LiquidOunce {
        LiquidOunce._instance = LiquidOunce._instance || new LiquidOunce();
        return LiquidOunce._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
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

    roundValue(value: number): number {
        return Math.round(value * 10) / 10;
    }

    isValidConvertibleMeasureUnit(value: number): boolean {
        return value >= 1;
    }
}
