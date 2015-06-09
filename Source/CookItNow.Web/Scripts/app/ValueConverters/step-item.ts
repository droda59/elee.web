/// <reference path="../../typings/aurelia/aurelia-templating-resources.d.ts"/>
/// <reference path="./duration-format.ts" />

import {DurationFormatValueConverter} from "ValueConverters/duration-format";
import {SanitizeHtmlValueConverter} from "aurelia-templating-resources/sanitize-html";

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
			var formattedDuration = new DurationFormatValueConverter().toView(match[0]);
			var durationHtml = "<span class='timer'>" + formattedDuration + "</span>";
			
			value = value.replace(match[0], durationHtml);
		};
		
		while (match = /\./.exec(value)) {
			var lineBreak = match[0].replace(".", "<br />");
			value = value.replace(match[0], lineBreak);
		};
		
		var sanitizedValue = new SanitizeHtmlValueConverter().toView(value);
		
		return sanitizedValue;
	}
}