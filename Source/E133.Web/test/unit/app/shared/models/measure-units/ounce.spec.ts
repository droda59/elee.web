import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Gram} from "app/shared/models/measure-units/gram";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";

describe("the Ounce measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Ounce.instance;
    });

    it("has the oz abbreviation", () => {
        expect(unit.abbreviation).toBe("oz");
    });

    it("is an imperial unit", () => {
        expect(unit.system).toBe("imperial");
    });

    it("is a weight unit", () => {
        expect(unit.type).toBe("weight");
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

    it("converts to 28.3 grams", () => {
        var rate = unit.getConversionRate(Gram.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(28.3);
    });

    it("converts to 1/35 kilograms", () => {
        var rate = 35 * unit.getConversionRate(Kilogram.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1 ounce", () => {
        var rate = unit.getConversionRate(Ounce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/16 pound", () => {
        var rate = 16 * unit.getConversionRate(Pound.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
