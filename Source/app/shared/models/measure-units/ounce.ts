import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Ounce extends MeasureUnit {
  constructor() {
    super("oz", "weight", "imperial");
  }

  static get instance(): Ounce {
    Ounce._instance = Ounce._instance || new Ounce();
    return Ounce._instance;
  }

  getConversionRate(targetUnit: string): number {
    switch (targetUnit) {
      case "g": return 28.3495;
      case "kg": return 0.0283;
      case "lb": return 0.0625;
      case "oz": return 1;
    }
  }

  roundValue(value: number): number {
    return Math.round(value * 10) / 10;
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    return value >= 1;
  }
}
