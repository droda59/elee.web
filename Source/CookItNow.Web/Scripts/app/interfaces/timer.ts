import {EventAggregator} from "aurelia-event-aggregator";

export class Timer {
    duration: string;
	eventAggregator: EventAggregator;
	
    constructor(eventAggregator: EventAggregator, duration: string) {
		this.eventAggregator = eventAggregator;
        this.duration = duration;
    }
    
    start() {
        // TODO Do something with the duration
        this.eventAggregator.publish("TIMERSTARTED", this);
    }
}