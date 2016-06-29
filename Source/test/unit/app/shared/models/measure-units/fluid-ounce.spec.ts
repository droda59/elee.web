import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the FluidOunce measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = FluidOunce.instance;
    });

    it("has the floz abbreviation", () => {
        expect(unit.abbreviation).toBe("floz");
    });

    it("is an imperial unit", () => {
        expect(unit.system).toBe("imperial");
    });

    it("is a volume unit", () => {
        expect(unit.type).toBe("volume");
    });

    it("is not in the short units unit", () => {
        expect(unit.isShortUnit).toBe(false);
    });

    it("rounds quantities to one decimal", () => {
        var value = unit.roundValue(1.2);

        expect(value).toBe(1.2);
    });

    it("rounds quantities to one decimal", () => {
        var value = unit.roundValue(1.24);

        expect(value).toBe(1.2);
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

    it("converts to 30 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(30);
    });

    it("converts to 3 centilitres", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(3);
    });

    it("converts to 1/3 decilitre", () => {
        var rate = 3 * unit.getConversionRate(Decilitre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/33 litre", () => {
        var rate = 33.3 * unit.getConversionRate(Litre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 6 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(6);
    });

    it("converts to 2 tablespoons", () => {
        var rate = unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(2);
    });

    it("converts to 1 fluid ounce", () => {
        var rate = unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/8 cup", () => {
        var rate = 8 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
