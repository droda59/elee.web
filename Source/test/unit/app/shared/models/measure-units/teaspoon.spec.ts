import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Teaspoon measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Teaspoon.instance;
    });

    it("has the tsp abbreviation", () => {
        expect(unit.abbreviation).toBe("tsp");
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
        expect(unit.roundValue(0.125)).toBe(0.125);
        expect(unit.roundValue(0.13)).toBe(0.125);
    });

    it("rounds quantities to 1/4", () => {
        expect(unit.roundValue(0.20)).toBe(0.25);
        expect(unit.roundValue(0.23)).toBe(0.25);
        expect(unit.roundValue(0.26)).toBe(0.25);
    });

    it("rounds quantities to 3/8", () => {
        expect(unit.roundValue(0.37)).toBe(0.375);
        expect(unit.roundValue(0.375)).toBe(0.375);
        expect(unit.roundValue(0.38)).toBe(0.375);
    });

    it("rounds quantities to 1/2", () => {
        expect(unit.roundValue(0.5)).toBe(0.5);
    });

    it("rounds quantities to 5/8", () => {
        expect(unit.roundValue(0.62)).toBe(0.625);
        expect(unit.roundValue(0.625)).toBe(0.625);
        expect(unit.roundValue(0.63)).toBe(0.625);
    });

    it("rounds quantities to 3/4", () => {
        expect(unit.roundValue(0.74)).toBe(0.75);
        expect(unit.roundValue(0.75)).toBe(0.75);
        expect(unit.roundValue(0.76)).toBe(0.75);
    });

    it("rounds quantities to 7/8", () => {
        expect(unit.roundValue(0.87)).toBe(0.875);
        expect(unit.roundValue(0.875)).toBe(0.875);
        expect(unit.roundValue(0.88)).toBe(0.875);
    });

    it("doesn't round quantities outside ranges", () => {
        expect(unit.roundValue(0.119)).toBe(0.119);
        expect(unit.roundValue(0.131)).toBe(0.131);

        expect(unit.roundValue(0.19)).toBe(0.19);
        expect(unit.roundValue(0.27)).toBe(0.27);

        expect(unit.roundValue(0.369)).toBe(0.369);
        expect(unit.roundValue(0.381)).toBe(0.381);

        expect(unit.roundValue(0.4)).toBe(0.4);
        expect(unit.roundValue(0.6)).toBe(0.6);

        expect(unit.roundValue(0.619)).toBe(0.619);
        expect(unit.roundValue(0.631)).toBe(0.631);

        expect(unit.roundValue(0.73)).toBe(0.73);
        expect(unit.roundValue(0.77)).toBe(0.77);

        expect(unit.roundValue(0.869)).toBe(0.869);
        expect(unit.roundValue(0.881)).toBe(0.881);
    });

    it("returns valid quantity of 1/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.125);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.25);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 3/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.375);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.5);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 5/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.625);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 3/4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.75);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 7/8", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.875);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(2);

        expect(isValid).toBe(true);
    });

    it("returns invalid quantity of 3", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(3);

        expect(isValid).toBe(false);
    });

    it("returns valid quantity of 4", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(4);

        expect(isValid).toBe(true);
    });

    it("returns invalid quantity of 5", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(5);

        expect(isValid).toBe(false);
    });

    it("returns invalid quantity of more than 5", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(6);

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

    it("converts to 5 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(5);
    });

    it("converts to 1/2 centilitre", () => {
        var rate = 2 * unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/20 decilitre", () => {
        var rate = 20 * unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/200 litre", () => {
        var rate = 200 * unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1 teaspoon", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/3 tablespoon", () => {
        var rate = 3 * unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/6 fluid ounce", () => {
        var rate = 6 * unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/50 cup", () => {
        var rate = 50 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
