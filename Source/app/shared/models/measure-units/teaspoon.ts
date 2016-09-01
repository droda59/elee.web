import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";

export class Teaspoon extends MeasureUnit {
  constructor() {
    super("tsp", "volume", "imperial", true);
  }

  static get instance(): Teaspoon {
    Teaspoon._instance = Teaspoon._instance || new Teaspoon();
    return Teaspoon._instance;
  }

  getConversionRate(targetUnit: string): number {
    switch (targetUnit) {
      case "ml": return 5;
      case "cl": return 0.5;
      case "dl": return 0.05;
      case "l": return 0.005;
      case "tsp": return 1;
      case "tbsp": return 0.333333;
      case "floz": return 0.166667;
      case "cup": return 0.0208333;
    }
  }

  roundValue(value: number): number {
    var thirdDecimalPlaceRound = Math.round(value * 1000) / 1000;
    if (thirdDecimalPlaceRound >= 0.120 && thirdDecimalPlaceRound <= 0.130) { return 0.125; }
    else if (thirdDecimalPlaceRound >= 0.370 && thirdDecimalPlaceRound <= 0.380) { return 0.375; }
    else if (thirdDecimalPlaceRound >= 0.620 && thirdDecimalPlaceRound <= 0.630) { return 0.625; }
    else if (thirdDecimalPlaceRound >= 0.870 && thirdDecimalPlaceRound <= 0.880) { return 0.875; }

    var secondDecimalPlaceRound = Math.round(value * 100) / 100;
    if (secondDecimalPlaceRound >= 0.20 && secondDecimalPlaceRound <= 0.26) { return 0.25; }
    else if (secondDecimalPlaceRound >= 0.74 && secondDecimalPlaceRound <= 0.76) { return 0.75; }

    var firstDecimalPlaceRound = Math.round(value * 10) / 10;
    if (firstDecimalPlaceRound === 0.5) { return 0.5; }
    else if (firstDecimalPlaceRound >= 1 && Math.round((firstDecimalPlaceRound % 1) * 10) / 10 <= 0.1) { return Math.trunc(firstDecimalPlaceRound); }

    return value;
  }

  isValidConvertibleMeasureUnit(value: number): boolean {
    var decimal = this.getDecimal(value);

    return value === 0.125 || value === 0.25
      || value === 0.375 || value === 0.5
      || value === 0.625 || value === 0.75
      || value === 0.875
      || (value >= 1 && value !== 3 && value < 5 && decimal >= 0 && decimal <= 0.1);
  }
}
