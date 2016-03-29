export abstract class MeasureUnit {
    protected static _instance: MeasureUnit;

    constructor(private abbr: string) { }

    abstract getConversionRate(targetUnit: string): number;
    abstract roundValue(value: number): number;
    abstract isValidConvertibleMeasureUnit(value: number): boolean;

    get abbreviation(): string {
        return this.abbr;
    }

    protected getDecimal(value: number): number {
        return value % 1;
    }

    protected getInteger(value: number): number {
        return value - (this.getDecimal(value));
    }
}
