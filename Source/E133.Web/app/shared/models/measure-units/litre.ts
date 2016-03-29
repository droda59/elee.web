import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class Litre extends MeasureUnit {
    constructor() {
        super("l");
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
            case "tsp": return 202.884136;
            case "tbsp": return 67.628045;
            case "floz": return 35.1951;
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
