import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Litre measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Litre.instance;
    });

    it("has the l abbreviation", () => {
        expect(unit.abbreviation).toBe("l");
    });

    it("is a metric unit", () => {
        expect(unit.system).toBe("metric");
    });

    it("is a volume unit", () => {
        expect(unit.type).toBe("volume");
    });

    it("is in the short units unit", () => {
        expect(unit.isShortUnit).toBe(true);
    });

    it("rounds quantities to one decimal", () => {
        var value = unit.roundValue(1.2);

        expect(value).toBe(1.2);
    });

    it("rounds quantities to two decimals", () => {
        var value = unit.roundValue(1.24);

        expect(value).toBe(1.24);
    });

    it("rounds quantities to two decimals", () => {
        var value = unit.roundValue(1.243);

        expect(value).toBe(1.24);
    });

    it("doesn't round quantities with no decimal", () => {
        var value = unit.roundValue(2);

        expect(value).toBe(2);
    });

    it("returns valid quantity of 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("returns valid quantities over 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(2);

        expect(isValid).toBe(true);
    });

    it("returns invalid quantities under 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.5);

        expect(isValid).toBe(false);
    });

    it("converts to 1000 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(1000);
    });

    it("converts to 100 centilitres", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(100);
    });

    it("converts to 10 decilitres", () => {
        var rate = unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(10);
    });

    it("converts to 1 litre", () => {
        var rate = unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 200 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(200);
    });

    it("converts to about 66 tablespoons", () => {
        var rate = unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(66.67);
    });

    it("converts to about 33 fluid ounces", () => {
        var rate = unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(33.33);
    });

    it("converts to 4 cups", () => {
        var rate = unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(4);
    });
});
