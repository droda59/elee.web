import {UppercaseFirstLetterFormatValueConverter} from "app/shared/value-converters/uppercase-first-letter-format";

describe("the Uppercase First Letter Format value converter module", () => {
    var converter: UppercaseFirstLetterFormatValueConverter;

    beforeEach(() => {
        converter = new UppercaseFirstLetterFormatValueConverter();
    });

    it("returns the first letter in upper case if lower case", () => {
        var result = converter.toView("some string");

        expect(result).toBe("Some string");
    });

        it("returns the first letter in upper case if upper case", () => {
        var result = converter.toView("SOME STRING");

        expect(result).toBe("SOME STRING");
    });
});
