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

export class MeasureUnitProvider {
    private _measureUnits: MeasureUnit[] = [];

    constructor() {
        this._measureUnits.push(Millilitre.instance);
        this._measureUnits.push(Centilitre.instance);
        this._measureUnits.push(Decilitre.instance);
        this._measureUnits.push(Litre.instance);
        this._measureUnits.push(Teaspoon.instance);
        this._measureUnits.push(Tablespoon.instance);
        this._measureUnits.push(FluidOunce.instance);
        this._measureUnits.push(Cup.instance);
        this._measureUnits.push(Pound.instance);
        this._measureUnits.push(Ounce.instance);
        this._measureUnits.push(Gram.instance);
        this._measureUnits.push(Kilogram.instance);
        this._measureUnits.push(Unit.instance);
        this._measureUnits.push(Pinch.instance);
    }

    get measureUnits(): MeasureUnit[] {
        return this._measureUnits;
    }
}
