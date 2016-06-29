import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Cup measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Cup.instance;
    });

    it("has the cup abbreviation", () => {
        expect(unit.abbreviation).toBe("cup");
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

    it("rounds quantities to 1/8", () => {
        expect(unit.roundValue(0.12)).toBe(0.125);
        expect(unit.roundValue(0.15)).toBe(0.125);
        expect(unit.roundValue(0.186)).toBe(0.125);
    });

    it("rounds quantities to 1/8 with integer", () => {
        expect(unit.roundValue(1.12)).toBe(1.125);
        expect(unit.roundValue(1.15)).toBe(1.125);
        expect(unit.roundValue(1.186)).toBe(1.125);
    });

    it("rounds quantities to 1/4", () => {
        expect(unit.roundValue(0.22)).toBe(0.25);
        expect(unit.roundValue(0.25)).toBe(0.25);
        expect(unit.roundValue(0.28)).toBe(0.25);
    });

    it("rounds quantities to 1/4 with integer", () => {
        expect(unit.roundValue(1.22)).toBe(1.25);
        expect(unit.roundValue(1.25)).toBe(1.25);
        expect(unit.roundValue(1.28)).toBe(1.25);
    });

    it("rounds quantities to 1/3", () => {
        expect(unit.roundValue(0.33)).toBe(0.333);
        expect(unit.roundValue(0.335)).toBe(0.333);
        expect(unit.roundValue(0.34)).toBe(0.333);
    });

    it("rounds quantities to 1/3 with integer", () => {
        expect(unit.roundValue(1.33)).toBe(1.333);
        expect(unit.roundValue(1.335)).toBe(1.333);
        expect(unit.roundValue(1.34)).toBe(1.333);
    });

    it("rounds quantities to 3/8", () => {
        expect(unit.roundValue(0.37)).toBe(0.375);
        expect(unit.roundValue(0.375)).toBe(0.375);
        expect(unit.roundValue(0.38)).toBe(0.375);
    });

    it("rounds quantities to 3/8 with integer", () => {
        expect(unit.roundValue(1.37)).toBe(1.375);
        expect(unit.roundValue(1.375)).toBe(1.375);
        expect(unit.roundValue(1.38)).toBe(1.375);
    });

    it("rounds quantities to 1/2", () => {
        expect(unit.roundValue(0.45)).toBe(0.5);
        expect(unit.roundValue(0.5)).toBe(0.5);
        expect(unit.roundValue(0.6)).toBe(0.5);
    });

    it("rounds quantities to 1/2 with integer", () => {
        expect(unit.roundValue(1.45)).toBe(1.5);
        expect(unit.roundValue(1.5)).toBe(1.5);
        expect(unit.roundValue(1.6)).toBe(1.5);
    });

    it("rounds quantities to 5/8", () => {
        expect(unit.roundValue(0.62)).toBe(0.625);
        expect(unit.roundValue(0.625)).toBe(0.625);
        expect(unit.roundValue(0.63)).toBe(0.625);
    });

    it("rounds quantities to 5/8 with integer", () => {
        expect(unit.roundValue(1.62)).toBe(1.625);
        expect(unit.roundValue(1.625)).toBe(1.625);
        expect(unit.roundValue(1.63)).toBe(1.625);
    });

    it("rounds quantities to 2/3", () => {
        expect(unit.roundValue(0.66)).toBe(0.666);
        expect(unit.roundValue(0.665)).toBe(0.666);
        expect(unit.roundValue(0.67)).toBe(0.666);
    });

    it("rounds quantities to 2/3 with integer", () => {
        expect(unit.roundValue(1.66)).toBe(1.666);
        expect(unit.roundValue(1.665)).toBe(1.666);
        expect(unit.roundValue(1.67)).toBe(1.666);
    });

    it("rounds quantities to 3/4", () => {
        expect(unit.roundValue(0.72)).toBe(0.75);
        expect(unit.roundValue(0.75)).toBe(0.75);
        expect(unit.roundValue(0.78)).toBe(0.75);
    });

    it("rounds quantities to 3/4 with integer", () => {
        expect(unit.roundValue(1.72)).toBe(1.75);
        expect(unit.roundValue(1.75)).toBe(1.75);
        expect(unit.roundValue(1.78)).toBe(1.75);
    });

    it("rounds quantities to 7/8", () => {
        expect(unit.roundValue(0.87)).toBe(0.875);
        expect(unit.roundValue(0.875)).toBe(0.875);
        expect(unit.roundValue(0.88)).toBe(0.875);
    });

    it("rounds quantities to 7/8 with integer", () => {
        expect(unit.roundValue(1.87)).toBe(1.875);
        expect(unit.roundValue(1.875)).toBe(1.875);
        expect(unit.roundValue(1.88)).toBe(1.875);
    });

    it("doesn't round quantities outside ranges", () => {
        expect(unit.roundValue(0.119)).toBe(0.119);
        expect(unit.roundValue(0.187)).toBe(0.187);

        expect(unit.roundValue(0.21)).toBe(0.21);
        expect(unit.roundValue(0.29)).toBe(0.29);

        expect(unit.roundValue(0.329)).toBe(0.329);
        expect(unit.roundValue(0.341)).toBe(0.341);

        expect(unit.roundValue(0.369)).toBe(0.369);
        expect(unit.roundValue(0.381)).toBe(0.381);

        expect(unit.roundValue(0.4)).toBe(0.4);
        expect(unit.roundValue(0.7)).toBe(0.7);

        expect(unit.roundValue(0.659)).toBe(0.659);
        expect(unit.roundValue(0.671)).toBe(0.671);

        expect(unit.roundValue(0.71)).toBe(0.71);
        expect(unit.roundValue(0.79)).toBe(0.79);

        expect(unit.roundValue(0.869)).toBe(0.869);
        expect(unit.roundValue(0.881)).toBe(0.881);
    });

    it("returns invalid quantity of 1/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.125);

        expect(isValid).toBe(false);
    });

    it("returns valid quantity of 1 1/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.125);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.25);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 1/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.25);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1/3", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.333);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 1/3", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.333);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 3/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.375);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 3/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.375);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.5);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.5);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 5/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.625);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 5/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.625);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 2/3", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.666);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 2/3", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.666);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 3/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.75);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 3/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.75);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 7/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.875);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 7/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.875);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity with no decimal", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("converts to 250 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(250);
    });

    it("converts to 25 centilitres", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(25);
    });

    it("converts to 2.5 decilitres", () => {
        var rate = 0.4 * unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/4 litre", () => {
        var rate = 4 * unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 48 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(48);
    });

    it("converts to 16 tablespoon", () => {
        var rate = unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(16);
    });

    it("converts to 8 fluid ounces", () => {
        var rate = unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(8);
    });

    it("converts to 1 cup", () => {
        var rate = unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
