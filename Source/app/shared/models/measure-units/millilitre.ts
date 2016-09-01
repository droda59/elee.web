import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Millilitre extends MeasureUnit {
  constructor() {
    super("ml", "volume", "metric", true);
  }

  static get instance(): Millilitre {
    Millilitre._instance = Millilitre._instance || new Millilitre();
    return Millilitre._instance;
  }

  getConversionRate(targetUnit: string): number {
    switch (targetUnit) {
      case "ml": return 1;
      case "cl": return 0.1;
      case "dl": return 0.01;
      case "l": return 0.001;
      case "tsp": return 0.2;
      case "tbsp": return 0.066;
      case "floz": return 0.033;
      case "cup": return 0.004; // 0.004226;
    }
  }

  roundValue(value: number): number {
    return Math.round(value * 10) / 10;
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    return value >= 1;
  }
}
