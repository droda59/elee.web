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

export class DurationFormatValueConverter {
	toView(value) {
		var regex = /PT\d\dH\d\dM/;
		
		if (!regex.test(value)){
			return value;
		}
		
		var hours = /\d\dH/.exec(value)[0];
		hours = hours.replace("H", " heures ");
		
		var minutes = /\d\dM/.exec(value)[0];
		minutes = minutes.replace("M", " minutes ");
		
		return hours + minutes;
	}
}

export class StepItemValueConverter {
	toView(value, ingredients: {}[]) {
		var match;
		while (match = /{action:'\D+'}/.exec(value)) {
			var action = match[0].replace("{action:'", "").replace("'}", "");
			var actionHtml = "<span class='action'>" + action.toLowerCase() + "</span>";
			value = value.replace(match[0], actionHtml);
		};
		
		while (match = /{ingredient:\d+}/.exec(value)) {
			var ingredientId = match[0].replace("{ingredient:", "").replace("}", "");
			
			var referencedIngredient = ingredients.filter(
				(item) => item["id"] == ingredientId
			)[0];
			
			var ingredient = referencedIngredient["quantity"]["value"] + " " + referencedIngredient["quantity"]["originalMeasureUnit"] + " de " + referencedIngredient["name"] + " ";
			var ingredientHtml = "<span class='ingredient'>" + ingredient.toLowerCase() + "</span>";
			value = value.replace(match[0], ingredientHtml);
		};
		
		while (match = /{timer:'PT\d\dH\d\dM'}/.exec(value)) {
			var hours = /\d\dH/.exec(match[0])[0];
			hours = hours.replace("H", " heures ");
			
			var minutes = /\d\dM/.exec(match[0])[0];
			minutes = minutes.replace("M", " minutes ");
			
			var originalTime = /PT\d\dH\d\dM/.exec(match[0])[0];
			var cleanStep = match[0].replace(originalTime, "").replace("{timer:'", "<span class='timer'>" + hours + minutes).replace("'}", "</span>");
			
			value = value.replace(match[0], cleanStep);
		};
		
		while (match = /\./.exec(value)) {
			var lineBreak = match[0].replace(".", "<br />");
			value = value.replace(match[0], lineBreak);
		};
		
		return value;
	}
}