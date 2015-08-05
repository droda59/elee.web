import {Timer} from "shared/models/timer";
import {TimerPart} from "quick-recipe/models/quick-recipe";
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";

@inject (EventAggregator)
export class StepTimer {
	private _eventAggregator: EventAggregator;
	timer: Timer;
	
	constructor(eventAggregator: EventAggregator) {
		this._eventAggregator = eventAggregator;
	}
	
	activate(model: TimerPart) {
        this.timer = new Timer(this._eventAggregator, model.value, model.action);
	}
}