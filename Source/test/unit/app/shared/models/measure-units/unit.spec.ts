import {MeasureUnit} from "app/shared/models/measure-units/measure-unit";
import {Unit} from "app/shared/models/measure-units/unit";

describe("the Unit measure unit", () => {
    var unit: MeasureUnit;

    beforeEach(() => {
        unit = Unit.instance;
    });

    it("has the unit abbreviation", () => {
        expect(unit.abbreviation).toBe("unit");
    });

    it("is not a metric unit", () => {
        expect(unit.system).not.toBe("metric");
    });

    it("is not an imperial unit", () => {
        expect(unit.system).not.toBe("imperial");
    });

    it("is not a volume unit", () => {
        expect(unit.type).not.toBe("volume");
    });

    it("is not a weight unit", () => {
        expect(unit.type).not.toBe("weight");
    });

    it("is not in the short units unit", () => {
        expect(unit.isShortUnit).toBe(false);
    });

    it("rounds quantities to value", () => {
        var value = unit.roundValue(2);

        expect(value).toBe(2);
    });

    it("returns valid quantity of anything", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(1);

        expect(isValid).toBe(true);
    });

    it("returns valid quantities over 1", () => {
        var isValid = unit.isValidConvertibleMeasureUnit(2);

        expect(isValid).toBe(true);
    });

    it("converts to anything", () => {
        var rate = unit.getConversionRate("anything");

        expect(rate).toBe(1);
    });
});
