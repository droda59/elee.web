import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Pinch extends MeasureUnit {
  constructor() {
    super("pinch");
  }

  static get instance(): Pinch {
    Pinch._instance = Pinch._instance || new Pinch();
    return Pinch._instance;
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
