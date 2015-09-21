import {inject} from "aurelia-framework";
import {I18N} from 'aurelia-i18n';

@inject (I18N)
export class QuantityFullNameFormatValueConverter {
	private _i18n: I18N;
	
	constructor(i18n: I18N) {
		this._i18n = i18n;
	}
	
	toView(measureUnit: string) {
		switch (measureUnit) {
			case "unit":
				return "";
		};
		
		var keyName = "quantities." + measureUnit + "_full";
		
		return this._i18n.tr(keyName);
	}
}