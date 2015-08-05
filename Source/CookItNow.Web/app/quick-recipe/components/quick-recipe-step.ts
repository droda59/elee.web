import {EventAggregator} from "aurelia-event-aggregator"; 
import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {Step} from "quick-recipe/models/quick-recipe";

@inject(EventAggregator)
export class QuickRecipeStep {
	@bindable step: Step = null;
	
	private _eventAggregator: EventAggregator;
	
	constructor(eventAggregator: EventAggregator)
	{
		this._eventAggregator = eventAggregator;
	}
	
	completeStep(event: any) {
		var parent = event.target.parentElement;
		
        this._eventAggregator.publish("STEPCOMPLETED", parent);
	}
}
