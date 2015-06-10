import {DurationFormatValueConverter} from "ValueConverters/duration-format";
import {SanitizeHtmlValueConverter} from "aurelia-templating-resources/sanitize-html";

export class StepItemValueConverter {
	toView(value: string, ingredients: {}[]) {
		var match;
		while (match = /{action:'\D+'}/.exec(value)) {
			var action = match[0].replace("{action:'", "").replace("'}", "");
			var actionHtml = "<span class='action'>" + action + "</span>";
			value = value.replace(match[0], actionHtml);
		}
		
		while (match = /{ingredient:\d+}/.exec(value)) {
			var ingredientId = match[0].replace("{ingredient:", "").replace("}", "");
			
			var referencedIngredient = ingredients.filter(
				(item) => item["id"] == ingredientId
			)[0];
			
			var ingredientName = referencedIngredient["name"].toLowerCase();
			var ingredientNameFirstLetter = ingredientName[0];
			var nextWord = 
				ingredientNameFirstLetter === "a" 
				|| ingredientNameFirstLetter === "e"
				|| ingredientNameFirstLetter === "i"
				|| ingredientNameFirstLetter === "o"
				|| ingredientNameFirstLetter === "u"
				|| ingredientNameFirstLetter === "y"
				|| ingredientNameFirstLetter === "h"
				? "d' "
				: "de ";
			
			var ingredientHtml = 
				"<span class='ingredient'>" + 
					"<span class='value'>" + referencedIngredient["quantity"]["value"].toString().replace(".", ",") + "</span>" + 
					"<span class='type'>" + referencedIngredient["quantity"]["originalMeasureUnit"] + "</span>" +
					" " + nextWord + "" + 
					"<span class='value'>" + ingredientName + "</span>" +
				"</span>";
			
			value = value.replace(match[0], ingredientHtml);
		}
		
		while (match = /{timer:'PT\d\dH\d\dM'}/.exec(value)) {
			var formattedDuration = new DurationFormatValueConverter().toView(match[0]);
			
			var durationHtml = 
				"<span class='timer'>" +
					"<a class='glyphicon glyphicon-time'>" + 
						formattedDuration + 
					"</a>" + 
				"</span>";
			
			value = value.replace(match[0], durationHtml);
		}
		
		var splits = value.split(".");
		splits.forEach(function(split) {
			if (split !== "") {
				var newSplit = split.trim();
				newSplit += ".<br />";
				value = value.replace(split + ".", newSplit);
			}
		}, this);
		
		var sanitizedValue = new SanitizeHtmlValueConverter().toView(value);
		
		return sanitizedValue;
	}
}