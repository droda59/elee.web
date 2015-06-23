import {EventAggregator} from "aurelia-event-aggregator";

export class Timer {
    duration: string;
    action: string;
    isPaused: boolean;
	eventAggregator: EventAggregator;
	
    constructor(eventAggregator: EventAggregator, duration: string, action: string) {
		this.eventAggregator = eventAggregator;
        this.duration = duration;
        this.action = action;
        this.isPaused = false;
    }
    
    start() {
        this.eventAggregator.publish("TIMERSTARTED", this);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    play() {
        this.isPaused = false;
    }
    
    delete() {
        this.eventAggregator.publish("TIMERDELETED", this);
    }
}