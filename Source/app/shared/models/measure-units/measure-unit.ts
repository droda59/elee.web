export abstract class MeasureUnit {
  protected static _instance: MeasureUnit;

  constructor(private _abbreviation: string, private _type?: string, private _system?: string, private _isShortUnit?: boolean) { }

  abstract getConversionRate(targetUnit: string): number;
  abstract roundValue(value: number): number;
  abstract isValidConvertibleMeasureUnit(value: number): boolean;

  get abbreviation(): string {
    return this._abbreviation;
  }

  get type(): string {
    return this._type;
  }

  get system(): string {
    return this._system;
  }

  get isShortUnit(): boolean {
    return this._isShortUnit || false;
  }

  protected getDecimal(value: number): number {
    return value % 1;
  }

  protected getInteger(value: number): number {
    return value - (this.getDecimal(value));
  }
}
