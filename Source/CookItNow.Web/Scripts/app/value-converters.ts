/// <reference path="../typings/moment.d.ts"/>

import * as moment from "moment";

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
		
		var match = regex.exec(value);
		var hours = match[0].slice(2, 4);
		var minutes = match[0].slice(5, 7);
		
		var duration = moment.duration({ hours: hours, minutes: minutes }).humanize();
		
		return duration;
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
			var regex = /PT\d\dH\d\dM/;
			
			var timerMatch = regex.exec(value);
			var hours = timerMatch[0].slice(2, 4);
			var minutes = timerMatch[0].slice(5, 7);
			
			var duration = moment.duration({ hours: hours, minutes: minutes }).humanize();
			var durationHtml = "<span class='timer'>" + duration + "</span>";
			
			value = value.replace(match[0], durationHtml);
		};
		
		while (match = /\./.exec(value)) {
			var lineBreak = match[0].replace(".", "<br />");
			value = value.replace(match[0], lineBreak);
		};
		
		return value;
	}
}