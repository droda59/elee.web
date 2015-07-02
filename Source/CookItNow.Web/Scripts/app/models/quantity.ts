export class Quantity {
    private _convertibleMeasureUnits: string[] = [ "ml", "cl", "dl", "l", "oz", "cups" ];
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
        var _this = this;
        var validConvertibleMeasureUnits = [];
        
        this._convertibleMeasureUnits.forEach(function(unit) {
            var value = this.getQuantity(unit);
            var finalValue = value;
            var isValid = unit === _this.originalMeasureUnit 
                || this.isValidConvertibleMeasureUnit(finalValue, unit);
                
                if (isValid) {
                    validConvertibleMeasureUnits.push({ value: finalValue, unit: unit});
                }
        }, this); 
        
        return validConvertibleMeasureUnits;
    }
    
    getQuantity(measureUnit: string): number {
        return this.value * this.getQuantityConversion(this.originalMeasureUnit, measureUnit);
    }
    
    private isValidConvertibleMeasureUnit(value: number, unit: string) {
        switch(unit) {
            case "ml": 
                return value > 1;
                
            case "cl": 
                return value > 1;
                
            case "dl": 
                return value > 1;
                
            case "l": 
                return value > 0.1;
                
            case "oz": 
                return value > 1;
                
            case "cups":
                return value === 0.125 || value === 0.25 || value === 0.3 
                    || value === 0.375 || value === 0.5 || value === 0.6 
                    || value === 0.625 || value === 0.75 || value === 0.875
                    || value === 0.9 || value === 1;
        }
    }
    
    private getQuantityConversion(fromUnit: string, toUnit: string): number {
        if (fromUnit === toUnit) {
            return 1;
        }
        
        if (fromUnit === "ml") {
            if (toUnit === "ml") { return 1; }
            else if (toUnit === "cl") { return 0.1; }
            else if (toUnit === "dl") { return 0.01; }
            else if (toUnit === "l") { return 0.001; }
            else if (toUnit === "oz") { return 0.033814; }
            else if (toUnit === "cups") { return 0.00422675; }
        }
        
        if (fromUnit === "cl") {
            if (toUnit === "ml") { return 10; }
            else if (toUnit === "cl") { return 1; }
            else if (toUnit === "dl") { return 0.1; }
            else if (toUnit === "l") { return 0.01; }
            else if (toUnit === "oz") { return 0.33814; }
            else if (toUnit === "cups") { return 0.0422675; }
        }
        
        if (fromUnit === "dl") {
            if (toUnit === "ml") { return 100; }
            else if (toUnit === "cl") { return 10; }
            else if (toUnit === "dl") { return 1; }
            else if (toUnit === "l") { return 0.01; }
            else if (toUnit === "oz") { return 0.33814; }
            else if (toUnit === "cups") { return 0.0422675; }
        }
        
        if (fromUnit === "l") {
            if (toUnit === "ml") { return 1000; }
            else if (toUnit === "cl") { return 100; }
            else if (toUnit === "dl") { return 10; }
            else if (toUnit === "l") { return 1; }
            else if (toUnit === "oz") { return 3.3814; }
            else if (toUnit === "cups") { return 0.422675; }
        }
        
        if (fromUnit === "oz") {
            if (toUnit === "ml") { return 42; }
            else if (toUnit === "cl") { return 42; }
            else if (toUnit === "dl") { return 42; }
            else if (toUnit === "l") { return 42; }
            else if (toUnit === "oz") { return 1; }
            else if (toUnit === "cups") { return 42; }
        }
        
        if (fromUnit === "cups") {
            if (toUnit === "ml") { return 250; }
            else if (toUnit === "cl") { return 25; }
            else if (toUnit === "dl") { return 2.5; }
            else if (toUnit === "l") { return 0.25; }
            else if (toUnit === "oz") { return 42; }
            else if (toUnit === "cups") { return 1; }
        }
    }
}