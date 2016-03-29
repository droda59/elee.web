import {MeasureUnit} from "shared/models/measure-units/measure-unit";
import {Cup} from "shared/models/measure-units/cup";
import {LiquidOunce} from "shared/models/measure-units/liquid-ounce";
import {Tablespoon} from "shared/models/measure-units/tablespoon";
import {Teaspoon} from "shared/models/measure-units/teaspoon";
import {Litre} from "shared/models/measure-units/litre";
import {Decilitre} from "shared/models/measure-units/decilitre";
import {Centilitre} from "shared/models/measure-units/centilitre";
import {Millilitre} from "shared/models/measure-units/millilitre";
import {Pound} from "shared/models/measure-units/pound";
import {Ounce} from "shared/models/measure-units/ounce";
import {Kilogram} from "shared/models/measure-units/kilogram";
import {Gram} from "shared/models/measure-units/gram";
import {Unit} from "shared/models/measure-units/unit";

export class Quantity implements QuantityDto {
    value: number = 0;
    abbreviation: string = "";
    format: string = undefined;
    formatAbbreviation: string = undefined;

    unit: MeasureUnit = undefined;
    formatUnit: MeasureUnit = undefined;

    constructor();
    constructor(dto: QuantityDto);
    constructor(dto?: QuantityDto) {
        Object.assign(this, dto);

        if (dto) {
            this.unit = MeasureUnitFactory.createUnit(dto.abbreviation);
            this.formatUnit = MeasureUnitFactory.createUnit(dto.formatAbbreviation);
        }
    }
}
export interface QuantityDto {
    value: number;
    abbreviation: string;
    format: string;
    formatAbbreviation: string;
}

class MeasureUnitFactory {
    static createUnit(abbreviation: string): MeasureUnit {
        switch(abbreviation) {
            case "cup": return Cup.instance;
            case "floz": return LiquidOunce.instance;
            case "tbsp": return Tablespoon.instance;
            case "tsp": return Teaspoon.instance;
            case "l": return Litre.instance;
            case "dl": return Decilitre.instance;
            case "cl": return Centilitre.instance;
            case "ml": return Millilitre.instance;
            case "lb": return Pound.instance;
            case "oz": return Ounce.instance;
            case "kg": return Kilogram.instance;
            case "g": return Gram.instance;
            case "unit": return Unit.instance;
        }

        return undefined;
    }
}
