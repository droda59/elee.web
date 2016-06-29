import {TextUtils} from "app/shared/text-utils";

describe("the Text Utilities module", () => {
    it("returns true if A", () => {
        expect(TextUtils.isVowel("a")).toBe(true);
        expect(TextUtils.isVowel("A")).toBe(true);
    });

    it("returns true if E", () => {
        expect(TextUtils.isVowel("e")).toBe(true);
        expect(TextUtils.isVowel("E")).toBe(true);
    });

    it("returns true if I", () => {
        expect(TextUtils.isVowel("i")).toBe(true);
        expect(TextUtils.isVowel("I")).toBe(true);
    });

    it("returns true if O", () => {
        expect(TextUtils.isVowel("o")).toBe(true);
        expect(TextUtils.isVowel("O")).toBe(true);
    });

    it("returns true if U", () => {
        expect(TextUtils.isVowel("u")).toBe(true);
        expect(TextUtils.isVowel("U")).toBe(true);
    });

    it("returns true if Y", () => {
        expect(TextUtils.isVowel("y")).toBe(true);
        expect(TextUtils.isVowel("Y")).toBe(true);
    });

    it("returns true if silent H", () => {
        expect(TextUtils.isVowel("h")).toBe(true);
        expect(TextUtils.isVowel("H")).toBe(true);
    });
});
