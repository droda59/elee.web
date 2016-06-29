import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Gram} from "app/shared/models/measure-units/gram";
import {Unit} from "app/shared/models/measure-units/unit";
import {Pinch} from "app/shared/models/measure-units/pinch";

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
            case "floz": return FluidOunce.instance;
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
            case "pinch": return Pinch.instance;
        }

        return undefined;
    }
}
