export class FilterOnPropertyValueConverter {
	toView(array: {}[], property: string, exp: string) {
		if (array === undefined || array === null || property === undefined || exp === undefined) {
			return array;
		}
		
		return array.filter(
			(item) => item[property] === exp
		);
	}
}

export class FilterSingleOnPropertyValueConverter {
	toView(array: {}[], property: string, exp: string) {
		var filter = new FilterOnPropertyValueConverter();
		return filter.toView(array, property, exp)[0];
	}
}