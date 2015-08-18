import {EventAggregator} from "aurelia-event-aggregator"; 
import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {Step, Phrase} from "quick-recipe/models/quick-recipe";

@inject(EventAggregator)
export class QuickRecipeStep {
	@bindable step: Step = null;
	
	private _eventAggregator: EventAggregator;
	
	constructor(eventAggregator: EventAggregator)
	{
		this._eventAggregator = eventAggregator;
	}
	
	backStep(event: any) {
		var parent = event.target.parentElement.parentElement.parentElement;
		
		this._eventAggregator.publish("STEPRETURNED", parent);
	}
	
	completeStep(event: any) {
		var parent = event.target.parentElement.parentElement.parentElement;
		
        this._eventAggregator.publish("STEPCOMPLETED", parent);
	}
	
	isTechnicalPhrase(phrase: Phrase) {
		var ingredientParts = phrase.parts.filter(
			(part) => part.type == "ingredient" || part.type == "enumeration"
		);
			
		return ingredientParts.length === 0;
	}
}
