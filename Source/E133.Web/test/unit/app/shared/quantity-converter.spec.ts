// import {Quantity} from "app/shared/models/quantity";
// import {QuantityConverter} from "app/shared/quantity-converter";
//
// describe("the quantity conversion module", () => {
//     var converter: QuantityConverter;
//
//     beforeEach(() => {
//         converter = new QuantityConverter();
//     });
//
//     it("converts 1000ml metric to 4cups imperial short", () => {
//         var quantity = new Quantity();
//         quantity.value = 1000;
//         quantity.unit = "ml";
//
//         var result: Quantity = converter.getBestConvertibleMeasureUnit(quantity, "imperialShort");
//
//         expect(result.value).toBe(4);
//         expect(result.unit).toBe("cup");
//     });
//
//     it("converts 1000ml metric to 4cups imperial complete", () => {
//         var quantity = new Quantity();
//         quantity.value = 1000;
//         quantity.unit = "ml";
//
//         var result: Quantity = converter.getBestConvertibleMeasureUnit(quantity, "imperialComplete");
//
//         expect(result.value).toBe(4);
//         expect(result.unit).toBe("cup");
//     });
// });
