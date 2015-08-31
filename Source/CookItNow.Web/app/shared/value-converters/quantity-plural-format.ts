import {inject} from "aurelia-framework";
import {I18N} from 'aurelia-i18n';

@inject (I18N)
export class QuantityPluralFormatValueConverter {
	private _i18n: I18N;
	
	constructor(i18n: I18N) {
		this._i18n = i18n;
	}
	
	toView(measureUnit: string, value: number) {
		switch (measureUnit) {
			case "unit":
				return "";
		};
		
		var keyName = "quantities." + measureUnit;
		if (value > 1) {
			keyName += "_plural";
		}
		
		return this._i18n.tr(keyName);
	}
}