import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Cup} from "app/shared/models/measure-units/cup";
import {FluidOunce} from "app/shared/models/measure-units/fluid-ounce";
import {Tablespoon} from "app/shared/models/measure-units/tablespoon";
import {Teaspoon} from "app/shared/models/measure-units/teaspoon";
import {Litre} from "app/shared/models/measure-units/litre";
import {Decilitre} from "app/shared/models/measure-units/decilitre";
import {Centilitre} from "app/shared/models/measure-units/centilitre";
import {Millilitre} from "app/shared/models/measure-units/millilitre";

describe("the Decilitre measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Decilitre.instance;
    });

    it("has the dl abbreviation", () => {
        expect(unit.abbreviation).toBe("dl");
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

    it("converts to 100 millilitres", () => {
        var rate = unit.getConversionRate(Millilitre.instance.abbreviation);

        expect(rate).toBe(100);
    });

    it("converts to 10 centilitres", () => {
        var rate = unit.getConversionRate(Centilitre.instance.abbreviation);

        expect(rate).toBe(10);
    });

    it("converts to 1 decilitre", () => {
        var rate = unit.getConversionRate(Decilitre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/10 litre", () => {
        var rate = 10 * unit.getConversionRate(Litre.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 20 teaspoons", () => {
        var rate = unit.getConversionRate(Teaspoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(20);
    });

    it("converts to about 6 tablespoons", () => {
        var rate = unit.getConversionRate(Tablespoon.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(6.7);
    });

    it("converts to about 3 fluid ounces", () => {
        var rate = unit.getConversionRate(FluidOunce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(3.3);
    });

    it("converts to 2/5 cup", () => {
        var rate = 2.5 * unit.getConversionRate(Cup.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
