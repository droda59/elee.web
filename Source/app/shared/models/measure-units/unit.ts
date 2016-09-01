import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Unit extends MeasureUnit {
  constructor() {
    super("unit");
  }

  static get instance(): Unit {
    Unit._instance = Unit._instance || new Unit();
    return Unit._instance;
  }

  getConversionRate(targetUnit: string): number {
    return 1;
  }

  roundValue(value: number): number {
    return value;
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    return true;
  }
}
