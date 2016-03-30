import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Tablespoon measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Tablespoon.instance;
    });

    it("has the tbsp abbreviation", () => {
        expect(unit.abbreviation).toBe("tbsp");
    });

    it("is an imperial unit", () => {
        expect(unit.system).toBe("imperial");
    });

    it("is a volume unit", () => {
        expect(unit.type).toBe("volume");
    });

    it("is in the short units unit", () => {
        expect(unit.isShortUnit).toBe(true);
    });

    it("rounds quantities to 1/2", () => {
        expect(unit.roundValue(0.5)).toBe(0.5);
    });

    it("doesn't round quantities outside ranges", () => {
        expect(unit.roundValue(0.4)).toBe(0.4);
        expect(unit.roundValue(0.6)).toBe(0.6);
    });

    it("returns valid quantity of 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.5);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 6", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(6);

        expect(isValid).toBe(true);
    });

    it("returns invalid quantity of more than 6", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(7);

        expect(isValid).toBe(false);
    });

    it("returns valid quantity with decimal less than 0.1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.09);

        expect(isValid).toBe(true);
    });

    it("returns invalid quantity with decimal more than 0.1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.11);

        expect(isValid).toBe(false);
    });

    it("converts to 15 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(15);
    });

    it("converts to 1.5 centilitre", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(1.5);
    });

    it("converts to 0.15 decilitre", () => {
        var rate = 6.67 * unit.getConversionRate(Decilitre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 0.015 litre", () => {
        var rate = 66.67 * unit.getConversionRate(Litre.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 3 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(3);
    });

    it("converts to 1 tablespoon", () => {
        var rate = unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/2 fluid ounce", () => {
        var rate = 2 * unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/16 cup", () => {
        var rate = 16 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
