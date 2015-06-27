import {Step, Ingredient} from "models/quick-recipe";
import {Timer} from "models/timer";
import {ComposeValueConverter} from "value-converters/compose";
import {inject} from "aurelia-framework";
import {SanitizeHtmlValueConverter} from "aurelia-templating-resources/sanitize-html";
import {EventAggregator} from "aurelia-event-aggregator";

@inject (EventAggregator)
export class StepItemValueConverter {
	private eventAggregator: EventAggregator;
	
    constructor(eventAggregator: EventAggregator) {
		this.eventAggregator = eventAggregator;
    }
	
	toView(value: Step, ingredients: Ingredient[], timers: Timer[]) {
		var composeValueConverter = new ComposeValueConverter();
		var output = value.description;
		var matches;
		
		var splits = output.split(".");
		(splits || []).forEach(function(split) {
			if (split !== "") {
				var newSplit = split.trim() + ".<br />";
				output = output.replace(split + ".", newSplit);
			}
		}, this);
		
		matches = output.match(/{timer:'PT\d\dH\d\dM'}/g);
		(matches || []).forEach(function(match) {
			var timer = match.replace("{timer:'", "").replace("'}", "");
			
			var previousActionRegExp = new RegExp("({action:'[a-zA-Z0-9\u00E0-\u00FC' ']+'}*)(?=[^]*?" + match + ")");
			var previousAction = previousActionRegExp.exec(output)[0];
			var actionVerb = previousAction.replace("{action:'", "").replace("'}", "").toLowerCase();
			
			timers.push(new Timer(this.eventAggregator, timer, actionVerb));
			
			var compose = composeValueConverter.toView("timers[" + (timers.length - 1) + "]", "widgets/step-timer");
			output = output.replace(match, compose);
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
		
		output = new SanitizeHtmlValueConverter().toView(output);
		
		return output;
	}
}