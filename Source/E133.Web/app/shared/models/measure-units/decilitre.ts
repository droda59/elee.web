import {MeasureUnit} from "shared/models/measure-units/measure-unit";

export class Decilitre extends MeasureUnit {
    constructor() {
        super("dl", "volume", "metric");
    }

    static get instance(): Decilitre {
        Decilitre._instance = Decilitre._instance || new Decilitre();
        return Decilitre._instance;
    }

    getConversionRate(targetUnit: string): number {
        switch (targetUnit) {
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

    roundValue(value: number): number {
        return Math.round(value * 10) / 10;
    }

    isValidConvertibleMeasureUnit(value: number): boolean {
        return value > 1;
    }
}
