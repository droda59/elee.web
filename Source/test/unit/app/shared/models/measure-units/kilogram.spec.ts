import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Gram} from "app/shared/models/measure-units/gram";
import {Kilogram} from "app/shared/models/measure-units/kilogram";
import {Pound} from "app/shared/models/measure-units/pound";
import {Ounce} from "app/shared/models/measure-units/ounce";

describe("the Kilogram measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Kilogram.instance;
    });

    it("has the kg abbreviation", () => {
        expect(unit.abbreviation).toBe("kg");
    });

    it("is a metric unit", () => {
        expect(unit.system).toBe("metric");
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

    it("converts to 1000 grams", () => {
        var rate = unit.getConversionRate(Gram.instance.abbreviation);

        expect(rate).toBe(1000);
    });

    it("converts to 1 kilogram", () => {
        var rate = unit.getConversionRate(Kilogram.instance.abbreviation);

        expect(rate).toBe(1);
    });

    it("converts to 2.2 pounds", () => {
        var rate = unit.getConversionRate(Pound.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(2.2);
    });

    it("converts to 35.3 ounces", () => {
        var rate = unit.getConversionRate(Ounce.instance.abbreviation);
        rate = unit.roundValue(rate);

        expect(rate).toBe(35.3);
    });
});
