import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Centilitre measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Centilitre.instance;
    });

    it("has the cl abbreviation", () => {
        expect(unit.abbreviation).toBe("cl");
    });

    it("is a metric unit", () => {
        expect(unit.system).toBe("metric");
    });

    it("is a volume unit", () => {
        expect(unit.type).toBe("volume");
    });

    it("is not in the short units unit", () => {
        expect(unit.isShortUnit).toBe(false);
    });

    it("rounds quantities to unit", () => {
        var value = unit.roundValue(1.2);

        expect(value).toBe(1);
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

    it("converts to 10 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(10);
    });

    it("converts to 1 centilitre", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/10 decilitre", () => {
        var rate = 10 * unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/100 litre", () => {
        var rate = 100 * unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 2 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(2);
    });

    it("converts to 2/3 tablespoon", () => {
        var rate = 1.5 * unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/3 fluid ounce", () => {
        var rate = 3 * unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/25 cup", () => {
        var rate = 25 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
