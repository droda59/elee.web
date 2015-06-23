import {Timer} from "interfaces/timer";
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";

@inject (EventAggregator)
export class StepTimer {
	eventAggregator: EventAggregator;
	duration: string;
	timer: Timer;
	
	constructor(eventAggregator: EventAggregator) {
		this.eventAggregator = eventAggregator;
	}
	
	activate(model: string) {
		this.duration = model;
		this.timer = new Timer(this.eventAggregator, this.duration, "action");
	}
}