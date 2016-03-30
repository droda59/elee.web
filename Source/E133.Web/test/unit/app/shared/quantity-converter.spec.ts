import {Quantity} from "app/shared/models/quantity";
import {QuantityConverter} from "app/shared/quantity-converter";
import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {LiquidOunce} from "app/shared/models/measure-units/liquid-ounce";
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

describe("the quantity conversion module", () => {
    var converter: QuantityConverter;

    beforeEach(() => {
        converter = new QuantityConverter();
    });

    it("converts 1000ml metric to 4cups imperial short", () => {
        var quantity = new Quantity();
        quantity.value = 1000;
        quantity.unit = Millilitre.instance;

        var result: Quantity = converter.getBestConvertibleMeasureUnit(quantity, "imperialShort");

        expect(result.value).toBe(4);
        expect(result.unit).toBe(Cup.instance);
    });

    it("converts 1000ml metric to 4cups imperial complete", () => {
        var quantity = new Quantity();
        quantity.value = 1000;
        quantity.unit = Millilitre.instance;

        var result: Quantity = converter.getBestConvertibleMeasureUnit(quantity, "imperialComplete");

        expect(result.value).toBe(4);
        expect(result.unit).toBe(Cup.instance);
    });
});
