import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class Gram extends MeasureUnit {
    constructor() {
        super("g", "weight", "metric", true);
    }

    static get instance(): Gram {
        Gram._instance = Gram._instance || new Gram();
        return Gram._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
            case "g": return 1;
            case "kg": return 0.001;
            case "lb": return 0.0022;
            case "oz": return 0.035274;
        }
    }

    roundValue(value: number): number {
        return Math.round(value * 10) / 10;
    }

    isValidConvertibleMeasureUnit(value: number): boolean {
        return value > 1;
    }
}
