import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Centilitre extends MeasureUnit {
  constructor() {
    super("cl", "volume", "metric");
  }

  static get instance(): Centilitre {
    Centilitre._instance = Centilitre._instance || new Centilitre();
    return Centilitre._instance;
  }

  getConversionRate(targetUnit: string): number {
    switch (targetUnit) {
      case "ml": return 10;
      case "cl": return 1;
      case "dl": return 0.1;
      case "l": return 0.01;
      case "tsp": return 2;
      case "tbsp": return 0.667;
      case "floz": return 0.333;
      case "cup": return 0.04; // 0.042267;
    }
  }

  roundValue(value: number): number {
    return Math.round(value);
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    return value >= 1;
  }
}
