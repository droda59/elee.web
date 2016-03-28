import {TimeFormatValueConverter} from "app/shared/value-converters/time-format";

describe("the Time Format value converter module", () => {
    var converter: TimeFormatValueConverter;

    beforeEach(() => {
        converter = new TimeFormatValueConverter();
    });

    it("formats the string without any time", () => {
        var result = converter.toView(0);

        expect(result).toBe("00:00");
    });

    it("formats the string without hours", () => {
        var result = converter.toView(15);

        expect(result.length).toBe(5);
    });

    it("formats the string with seconds", () => {
        var result = converter.toView(15);

        expect(result).toBe("00:15");
    });

    it("formats the string with seconds to minutes", () => {
        var result = converter.toView(60);

        expect(result).toBe("01:00");
    });

    it("formats the string with minutes", () => {
        var result = converter.toView(75);

        expect(result).toBe("01:15");
    });

    it("formats the string with minutes to hours", () => {
        var result = converter.toView(3600);

        expect(result).toBe("01:00:00");
    });

    it("formats the string with hours", () => {
        var result = converter.toView(3675);

        expect(result.length).toBe(8);
        expect(result).toBe("01:01:15");
    });
});
