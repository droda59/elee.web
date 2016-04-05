import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Gram} from "app/shared/models/measure-units/gram";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";

describe("the Gram measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Gram.instance;
    });

    it("has the g abbreviation", () => {
        expect(unit.abbreviation).toBe("g");
    });

    it("is a metric unit", () => {
        expect(unit.system).toBe("metric");
    });

    it("is a weight unit", () => {
        expect(unit.type).toBe("weight");
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

    it("converts to 1 gram", () => {
        var rate = unit.getConversionRate(Gram.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/1000 kilogram", () => {
        var rate = 1000 * unit.getConversionRate(Kilogram.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 1/28 ounces", () => {
        var rate = 28 * unit.getConversionRate(Ounce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });

    it("converts to 1/454 pounds", () => {
        var rate = 454 * unit.getConversionRate(Pound.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(1);
    });
});
