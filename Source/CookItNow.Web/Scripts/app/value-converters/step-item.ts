import {Step} from "interfaces/quick-recipe";
import {Ingredient} from "interfaces/quick-recipe";
import {DurationFormatValueConverter} from "value-converters/duration-format";
import {ComposeValueConverter} from "value-converters/compose";
import {SanitizeHtmlValueConverter} from "aurelia-templating-resources/sanitize-html";

export class StepItemValueConverter {
	toView(value: Step, ingredients: Ingredient[]) {
		var composeValueConverter = new ComposeValueConverter();
		var output = value.description;
		var matches;
		
		var splits = output.split(".");
		splits.forEach(function(split) {
			if (split !== "") {
				var newSplit = split.trim() + ".<br />";
				output = output.replace(split + ".", newSplit);
			}
		}, this);
		
		matches = output.match(/{action:'[a-zA-Z0-9\u00E0-\u00FC' ']+'}/g);
		(matches || []).forEach(function(match) {
			var action = match.replace("{action:'", "").replace("'}", "");
			var compose = composeValueConverter.toView("'" + action + "'", "widgets/step-action");
			output = output.replace(match, compose);
		}, this);
		
		matches = output.match(/{ingredient:[0-9]+}/g);
		(matches || []).forEach(function(match) {
			var ingredientId = match.replace("{ingredient:", "").replace("}", "");			
			var ingredientIndex = 0;
			for (var i = 0; i < ingredients.length; i++) {
				if (ingredients[i].id == ingredientId) {
					ingredientIndex = i;
					break;
				}
			}
			
			var compose = composeValueConverter.toView("recipe.ingredients[" + ingredientIndex + "]", "widgets/step-ingredient");
			output = output.replace(match, compose);
		}, this);
		
		matches = output.match(/{timer:'PT\d\dH\d\dM'}/g);
		(matches || []).forEach(function(match) {
			var timer = match.replace("{timer:", "").replace("}", "");
			var formattedDuration = new DurationFormatValueConverter().toView(match);
			var compose = composeValueConverter.toView(timer, "widgets/step-timer");
			output = output.replace(match, compose);
		}, this);
		
		output = new SanitizeHtmlValueConverter().toView(output);
		
		return output;
	}
}