export class QuantityPluralFormatValueConverter {
	toView(measureUnit: string, value: number) {
		return this.getLocalizedMeasureUnit(value, measureUnit);
	}
	
	private getLocalizedMeasureUnit(value: number, measureUnit: string): string {
		switch (measureUnit) {
			case "ml":
				return " ml";
				
			case "cl":
				return " cl";
				
			case "dl":
				return " dl";
				
			case "l":
				return " l";
				
			case "oz":
				return " once" + (value > 1 ? "s" : "");
                    
            case "tsp": 
                return " c. à thé";
                    
            case "tbsp": 
                return " c. à soupe";
				
			case "cups":
				return " tasse" + (value > 1 ? "s" : "");
				
			case "pinch":
				return " pincée" + (value > 1 ? "s" : "");
		
			case "units":
			default:
				return "";
		};
	}
}