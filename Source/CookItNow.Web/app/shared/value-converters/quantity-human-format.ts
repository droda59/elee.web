export class QuantityHumanFormatValueConverter {
	toView(value: number, measureUnit: string) {
		return this.getHumanizedValue(value, measureUnit);
	}
	
	private getHumanizedValue(value: number, measureUnit: string): string {
        var isMetric = measureUnit == "ml"
            || measureUnit == "cl"
            || measureUnit == "dl"
            || measureUnit == "l"
            || measureUnit == "g"
            || measureUnit == "kg";
			
		if (isMetric) {
			return value.toString();
		}
		
		var decimal = Math.round((value % 1) * 1000) / 1000;
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
			default: return value.toString();
		};
		
		var integer = Math.trunc(value);
		var integerText = integer.toString();
		
		var text = (integer > 0 ? integerText : "") 
			+ (integer > 0 && decimal > 0 ? " " : "") 
			+ (decimal > 0 ? decimalText : "");
			
		return text;
	}
}