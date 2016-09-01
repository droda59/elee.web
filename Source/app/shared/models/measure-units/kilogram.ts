import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Kilogram extends MeasureUnit {
  constructor() {
    super("kg", "weight", "metric");
  }

  static get instance(): Kilogram {
    Kilogram._instance = Kilogram._instance || new Kilogram();
    return Kilogram._instance;
  }

  getConversionRate(targetUnit: string): number {
    switch (targetUnit) {
      case "g": return 1000;
      case "kg": return 1;
      case "lb": return 2.20264;
      case "oz": return 35.274;
    }
  }

  roundValue(value: number): number {
    return Math.round(value * 10) / 10;
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    return value >= 1;
  }
}
