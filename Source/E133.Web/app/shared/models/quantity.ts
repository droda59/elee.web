export class Quantity implements QuantityDto {
    value: number = 0;
    unit: string = "";
    format: string = undefined;
    formatUnit: string = undefined;

    constructor();
    constructor(dto: QuantityDto);
    constructor(dto?: QuantityDto) {
        Object.assign(this, dto);
    }
}
export interface QuantityDto {
    value: number;
    unit: string;
    format: string;
    formatUnit: string;
}
