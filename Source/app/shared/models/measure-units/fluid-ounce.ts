import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class FluidOunce extends MeasureUnit {
    constructor() {
        super("floz", "volume", "imperial");
    }

    static get instance(): FluidOunce {
        FluidOunce._instance = FluidOunce._instance || new FluidOunce();
        return FluidOunce._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
            case "ml": return 30;
            case "cl": return 3;
            case "dl": return 0.333;
            case "l": return 0.03;
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
