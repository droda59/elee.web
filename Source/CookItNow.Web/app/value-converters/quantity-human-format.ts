export class QuantityHumanFormatValueConverter {
	toView(value: number) {
		return this.getHumanizedValue(value);
	}
	
	private getHumanizedValue(value: number): string {
		switch (value) {
			case 0.125: return "1/8";
			case 0.25: return "1/4";
			case 0.333: return "1/3";
			case 0.375: return "3/8";
			case 0.5: return "1/2";
			case 0.625: return "5/8";
			case 0.666: return "2/3";
			case 0.75: return "3/4";
			case 0.875: return "7/8";
			default: return value.toString();
		};
	}
}