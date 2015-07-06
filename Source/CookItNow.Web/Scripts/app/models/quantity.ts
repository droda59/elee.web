export class Quantity {
    private _convertibleMeasureUnits: string[] = [ "ml", "cl", "dl", "l", "tbsp", "tsp", "oz", "cups" ];
    private _validConvertibleMeasureUnits: {}[];
    originalMeasureUnit: string;
    value: number;
    
    constructor(model) {
        for (var prop in model) {
            this[prop] = model[prop]
        };
    }
    
    isConvertible(): boolean {
        return this._convertibleMeasureUnits.indexOf(this.originalMeasureUnit) > -1;
    }
    
    getValidConvertibleMeasureUnits() {
        if (!this._validConvertibleMeasureUnits) {
            var _this = this;
            this._validConvertibleMeasureUnits = [];
            
            this._convertibleMeasureUnits.forEach(function(unit) {
                var value = this.getQuantity(unit);
                var isValid = unit === _this.originalMeasureUnit 
                    || this.isValidConvertibleMeasureUnit(value, unit);
                    
                    if (isValid) {
                        _this._validConvertibleMeasureUnits.push({ value: value, unit: unit});
                    }
            }, this); 
        }
        
        return this._validConvertibleMeasureUnits;
    }
    
    getQuantity(measureUnit: string): number {
        var value = this.value * this.getQuantityConversion(this.originalMeasureUnit, measureUnit);
        var approximatedValue = this.getApproximatedValue(value, measureUnit);
        
        return approximatedValue;
    }
    
    private getQuantityConversion(fromUnit: string, toUnit: string): number {
        if (fromUnit === "ml") {
            if (toUnit === "ml") { return 1; }
            else if (toUnit === "cl") { return 0.1; }
            else if (toUnit === "dl") { return 0.01; }
            else if (toUnit === "l") { return 0.001; }
            else if (toUnit === "oz") { return 0.033814; }
            else if (toUnit === "cups") { return 0.004226; }
            else if (toUnit === "tsp") { return 0.202884; }
            else if (toUnit === "tbsp") { return 0.067628; }
        } 
        else if (fromUnit === "cl") {
            if (toUnit === "ml") { return 10; }
            else if (toUnit === "cl") { return 1; }
            else if (toUnit === "dl") { return 0.1; }
            else if (toUnit === "l") { return 0.01; }
            else if (toUnit === "oz") { return 0.33814; }
            else if (toUnit === "cups") { return 0.042267; }
            else if (toUnit === "tsp") { return 2.028841; }
            else if (toUnit === "tbsp") { return 0.676280; }
        } 
        else if (fromUnit === "dl") {
            if (toUnit === "ml") { return 100; }
            else if (toUnit === "cl") { return 10; }
            else if (toUnit === "dl") { return 1; }
            else if (toUnit === "l") { return 0.01; }
            else if (toUnit === "oz") { return 0.33814; }
            else if (toUnit === "cups") { return 0.422675; }
            else if (toUnit === "tsp") { return 20.288413; }
            else if (toUnit === "tbsp") { return 6.762804; }
        } 
        else if (fromUnit === "l") {
            if (toUnit === "ml") { return 1000; }
            else if (toUnit === "cl") { return 100; }
            else if (toUnit === "dl") { return 10; }
            else if (toUnit === "l") { return 1; }
            else if (toUnit === "oz") { return 3.3814; }
            else if (toUnit === "cups") { return 4.226752; }
            else if (toUnit === "tsp") { return 202.884136; }
            else if (toUnit === "tbsp") { return 67.628045; }
        } 
        else if (fromUnit === "tsp") {
            if (toUnit === "ml") { return 4.92892; }
            else if (toUnit === "cl") { return 0.492892; }
            else if (toUnit === "dl") { return 0.049289; }
            else if (toUnit === "l") { return 0.004928; }
            else if (toUnit === "oz") { return 0.166667; }
            else if (toUnit === "cups") { return 0.0208333; }
            else if (toUnit === "tsp") { return 1; }
            else if (toUnit === "tbsp") { return 0.333333; }
        }
        else if (fromUnit === "tbsp") {
            if (toUnit === "ml") { return 14.7868; }
            else if (toUnit === "cl") { return 1.478676; }
            else if (toUnit === "dl") { return 0.147867; }
            else if (toUnit === "l") { return 0.014786; }
            else if (toUnit === "oz") { return 0.5; }
            else if (toUnit === "cups") { return 0.0625; }
            else if (toUnit === "tsp") { return 3; }
            else if (toUnit === "tbsp") { return 1; }
        }
        else if (fromUnit === "oz") {
            if (toUnit === "ml") { return 29.5735; }
            else if (toUnit === "cl") { return 2.9573; }
            else if (toUnit === "dl") { return 0.29573; }
            else if (toUnit === "l") { return 0.02957; }
            else if (toUnit === "oz") { return 1; }
            else if (toUnit === "cups") { return 0.125; }
            else if (toUnit === "tsp") { return 6; }
            else if (toUnit === "tbsp") { return 2; }
        } 
        else if (fromUnit === "cups") {
            if (toUnit === "ml") { return 236.588236; }
            else if (toUnit === "cl") { return 23.658823; }
            else if (toUnit === "dl") { return 2.365882; }
            else if (toUnit === "l") { return 0.236588; }
            else if (toUnit === "oz") { return 8; }
            else if (toUnit === "cups") { return 1; }
            else if (toUnit === "tsp") { return 48; }
            else if (toUnit === "tbsp") { return 16; }
        } 
    }
    
    private getApproximatedValue(value: number, measureUnit: string): number {
        switch(measureUnit) {
            case "ml": 
                return Math.round(value * 10) / 10;
                
            case "cl": 
                return Math.round(value);
                
            case "dl": 
                return Math.round(value * 10) / 10;
                
            case "l": 
                return Math.round(value * 100) / 100;
                
            case "tsp":
            {
                var thirdDecimalPlaceRound = Math.round(value * 1000) / 1000;
                if (thirdDecimalPlaceRound >= 0.120 && thirdDecimalPlaceRound <= 0.130) { return 0.125; }
                else if (thirdDecimalPlaceRound >= 0.370 && thirdDecimalPlaceRound <= 0.380) { return 0.375; }
                else if (thirdDecimalPlaceRound >= 0.620 && thirdDecimalPlaceRound <= 0.630) { return 0.625; }
                else if (thirdDecimalPlaceRound >= 0.870 && thirdDecimalPlaceRound <= 0.880) { return 0.875; }
                
                var secondDecimalPlaceRound = Math.round(value * 100) / 100;
                if (secondDecimalPlaceRound >= 0.24 && secondDecimalPlaceRound <= 0.26) { return 0.25; }
                else if (secondDecimalPlaceRound >= 0.74 && secondDecimalPlaceRound <= 0.76) { return 0.75; }
                
                var firstDecimalPlaceRound = Math.round(value * 10) / 10;
                if (firstDecimalPlaceRound === 0.5) { return 0.5; }
                else if (firstDecimalPlaceRound >= 1 && Math.trunc(firstDecimalPlaceRound) % 1 === 0) { return Math.trunc(firstDecimalPlaceRound); }
                
                return value;
            }
                
            case "tbsp":
            {
                var firstDecimalPlaceRound = Math.round(value * 10) / 10;
                if (firstDecimalPlaceRound === 0.5) { return 0.5; }
                else if (firstDecimalPlaceRound >= 1 && Math.trunc(firstDecimalPlaceRound) % 1 === 0) { return Math.trunc(firstDecimalPlaceRound); }
                
                return value;
            }
                
            case "oz": 
                return Math.round(value * 10) / 10;
                
            case "cups":
            {
                var thirdDecimalPlaceRound = Math.round(value * 1000) / 1000;
                if (thirdDecimalPlaceRound >= 0.120 && thirdDecimalPlaceRound <= 0.130) { return 0.125; }
                else if (thirdDecimalPlaceRound >= 0.370 && thirdDecimalPlaceRound <= 0.380) { return 0.375; }
                else if (thirdDecimalPlaceRound >= 0.620 && thirdDecimalPlaceRound <= 0.630) { return 0.625; }
                else if (thirdDecimalPlaceRound >= 0.870 && thirdDecimalPlaceRound <= 0.880) { return 0.875; }
                
                var secondDecimalPlaceRound = Math.round(value * 100) / 100;
                if (secondDecimalPlaceRound >= 0.24 && secondDecimalPlaceRound <= 0.26) { return 0.25; }
                else if (secondDecimalPlaceRound >= 0.74 && secondDecimalPlaceRound <= 0.76) { return 0.75; }
                
                var firstDecimalPlaceRound = Math.round(value * 10) / 10;
                if (firstDecimalPlaceRound === 0.3) { return 0.3; }
                else if (firstDecimalPlaceRound === 0.5) { return 0.5; }
                else if (firstDecimalPlaceRound === 0.6) { return 0.6; }
                else if (firstDecimalPlaceRound === 0.9) { return 0.9; }
                else if (firstDecimalPlaceRound >= 1 && Math.trunc(firstDecimalPlaceRound) % 1 === 0) { return Math.trunc(firstDecimalPlaceRound); }
                
                return value;
            }
        }
    }
    
    private isValidConvertibleMeasureUnit(value: number, measureUnit: string): boolean {
        switch(measureUnit) {
            case "ml": 
                return value > 1;
                
            case "cl": 
                return value > 1;
                
            case "dl": 
                return value > 1;
                
            case "l": 
                return value >= 1;
                    
            case "tsp": 
                return value === 0.125 || value === 0.25 
                    || value === 0.375 || value === 0.5 
                    || value === 0.625 || value === 0.75
                    || value === 0.875 
                    || (value >= 1 && value !== 3 && value < 5 && value % 1 >= 0 && value % 1 <= 0.1);
                    
            case "tbsp": 
                return value === 0.5 
                    || (value >= 1 && value <= 6 && value % 1 >= 0 && value % 1 <= 0.1);
                
            case "oz": 
                return value > 1;
                
            case "cups":
                return value === 0.125 || value === 0.25 || value === 0.3 
                    || value === 0.375 || value === 0.5 || value === 0.6 
                    || value === 0.625 || value === 0.75 || value === 0.875
                    || value === 0.9 || (value >= 1 && Math.trunc(value) % 1 === 0);
        }
    }
}