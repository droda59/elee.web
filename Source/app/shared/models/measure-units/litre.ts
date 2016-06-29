import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Litre extends MeasureUnit {
    constructor() {
        super("l", "volume", "metric", true);
    }

    static get instance(): Litre {
        Litre._instance = Litre._instance || new Litre();
        return Litre._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
            case "ml": return 1000;
            case "cl": return 100;
            case "dl": return 10;
            case "l": return 1;
            case "tsp": return 200;
            case "tbsp": return 66.667;
            case "floz": return 33.333;
            case "cup": return 4; // 4.226752;
        }
    }

    roundValue(value: number): number {
        return Math.round(value * 100) / 100;
    }

    isValidConvertibleMeasureUnit(value: number): boolean {
        return value >= 1;
    }
}
