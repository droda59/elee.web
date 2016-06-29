import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Millilitre measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Millilitre.instance;
    });

    it("has the ml abbreviation", () => {
        expect(unit.abbreviation).toBe("ml");
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

    it("converts to 1 millilitre", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/10 centilitre", () => {
        var rate = 10 * unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/100 decilitre", () => {
        var rate = 100 * unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/1000 litre", () => {
        var rate = 1000 * unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/5 teaspoon", () => {
        var rate = 5 * unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/15 tablespoon", () => {
        var rate = 15 * unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/30 fluid ounce", () => {
        var rate = 30 * unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/250 cup", () => {
        var rate = 250 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
