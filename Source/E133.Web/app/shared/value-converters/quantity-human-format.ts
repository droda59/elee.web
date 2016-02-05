import {inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {Quantity} from "shared/models/quantity";

@inject (I18N)
export class QuantityHumanFormatValueConverter {
	private _i18n: I18N;

	constructor(i18n: I18N) {
		this._i18n = i18n;
	}

	toView(quantity: Quantity, useFormat: boolean = true) {
		if (quantity.value === 0) {
			return "";
		}

		var quantityUnit = this._i18n.tr("quantities." + quantity.unit, { "count": quantity.value });
		var quantityValue = this.getHumanizedValue(quantity);

		if (quantity.format && useFormat) {
			quantityValue = String.format(quantity.format, quantityValue);
		}

		return quantityValue + " " + quantityUnit;
	}

	private getHumanizedValue(quantity: Quantity): string {
        var isMetric = quantity.unit == "ml"
            || quantity.unit == "cl"
            || quantity.unit == "dl"
            || quantity.unit == "g"
            || quantity.unit == "kg";

		if (isMetric) {
			return quantity.value.toString();
		}

		var decimal = quantity.value % 1;
		var decimalText = decimal.toString();

		switch (decimal) {
			case 0.125: decimalText = "1/8"; break;
			case 0.25: decimalText = "1/4"; break;
			case 0.333: decimalText = "1/3"; break;
			case 0.375: decimalText = "3/8"; break;
			case 0.5: decimalText = "1/2"; break;
			case 0.625: decimalText = "5/8"; break;
			case 0.666: decimalText = "2/3"; break;
			case 0.75: decimalText = "3/4"; break;
			case 0.875: decimalText = "7/8"; break;
			default: return quantity.value.toString();
		};

		var integer = Math.trunc(quantity.value);
		var integerText = integer.toString();

		var text = (integer > 0 ? integerText : "")
			+ (integer > 0 && decimal > 0 ? " " : "")
			+ (decimal > 0 ? decimalText : "");

		return text;
	}
}
