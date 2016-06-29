import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Gram} from "app/shared/models/measure-units/gram";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";

describe("the Pound measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Pound.instance;
    });

    it("has the lb abbreviation", () => {
        expect(unit.abbreviation).toBe("lb");
    });

    it("is an imperial unit", () => {
        expect(unit.system).toBe("imperial");
    });

    it("is a weight unit", () => {
        expect(unit.type).toBe("weight");
    });

    it("is in the short units unit", () => {
        expect(unit.isShortUnit).toBe(true);
    });

    it("rounds quantities to 1/4", () => {
        expect(unit.roundValue(0.24)).toBe(0.25);
        expect(unit.roundValue(0.25)).toBe(0.25);
        expect(unit.roundValue(0.26)).toBe(0.25);
    });

    it("rounds quantities to 1/4 with integer", () => {
        expect(unit.roundValue(1.24)).toBe(1.25);
        expect(unit.roundValue(1.25)).toBe(1.25);
        expect(unit.roundValue(1.26)).toBe(1.25);
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
        expect(unit.roundValue(0.74)).toBe(0.75);
        expect(unit.roundValue(0.75)).toBe(0.75);
        expect(unit.roundValue(0.76)).toBe(0.75);
    });

    it("rounds quantities to 3/4 with integer", () => {
        expect(unit.roundValue(1.74)).toBe(1.75);
        expect(unit.roundValue(1.75)).toBe(1.75);
        expect(unit.roundValue(1.76)).toBe(1.75);
    });

    it("rounds quantities to integer", () => {
        expect(unit.roundValue(0.99)).toBe(1);
        expect(unit.roundValue(0.995)).toBe(1);
    });

    it("doesn't round quantities outside ranges", () => {
        expect(unit.roundValue(0.23)).toBe(0.23);
        expect(unit.roundValue(0.27)).toBe(0.27);

        expect(unit.roundValue(0.329)).toBe(0.329);
        expect(unit.roundValue(0.341)).toBe(0.341);

        expect(unit.roundValue(0.4)).toBe(0.4);
        expect(unit.roundValue(0.7)).toBe(0.7);

        expect(unit.roundValue(0.659)).toBe(0.659);
        expect(unit.roundValue(0.671)).toBe(0.671);

        expect(unit.roundValue(0.73)).toBe(0.73);
        expect(unit.roundValue(0.77)).toBe(0.77);

        expect(unit.roundValue(0.8)).toBe(0.8);
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

    it("returns valid quantity of 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(0.5);

        expect(isValid).toBe(true);
    });

    it("returns valid quantity of 1 1/2", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1.5);

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

    it("returns valid quantity with no decimal", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("converts to 454 grams", () => {
        var rate = unit.getConversionRate(Gram.instance.abbreviation);

        expect(rate).toBe(454);
    });

    it("converts to 0.454 kilograms", () => {
        var rate = unit.getConversionRate(Kilogram.instance.abbreviation);

        expect(rate).toBe(0.454);
    });

    it("converts to 16 ounces", () => {
        var rate = unit.getConversionRate(Ounce.instance.abbreviation);

        expect(rate).toBe(16);
    });

    it("converts to 1 pound", () => {
        var rate = unit.getConversionRate(Pound.instance.abbreviation);

        expect(rate).toBe(1);
    });
});
