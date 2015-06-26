import {EventAggregator} from "aurelia-event-aggregator";
import * as moment from "moment";

export class Timer {
    duration: string;
    action: string;
    isPaused: boolean;
    state: string;
    original: moment.Duration;
    remaining: moment.Duration;
    timer: number;
	eventAggregator: EventAggregator;
	
    constructor(eventAggregator: EventAggregator, duration: string, action: string) {
		this.eventAggregator = eventAggregator;
        this.duration = duration;
        this.action = action;
        this.isPaused = true;
        this.state = "original";
        
		var match = /PT\d\dH\d\dM/.exec(duration);
		var hours = parseInt(match[0].slice(2, 4));
		var minutes = parseInt(match[0].slice(5, 7));
		
		this.original = moment.duration({ seconds: (minutes * 60) + (hours * 60 * 60) });
        this.remaining = this.original;
    }
    
    start() {
        this.eventAggregator.publish("TIMERSTARTED", this);
        this.play();
    }
    
    pause() {
        this.isPaused = true;
    }
    
    play() {
        this.isPaused = false;
        var that = this;
        
        this.timer = setInterval(function(){
            if (!that.isPaused) {
                that.remaining.add(-1, "seconds");
                
                that.state = that.remaining.seconds < ((that.original.seconds() / 100) * 20) 
                    ? that.remaining.seconds < ((that.remaining.seconds() / 100) * 10)
                        ? "isAlmosterDone"
                        : "isAlmostDone"
                    : "original";
                
                if (that.remaining.seconds() <= 0) {
                    that.isPaused = true;
                }
            }
        }, 1000);
    }
    
    delete() {
        clearInterval(this.timer);
        this.eventAggregator.publish("TIMERDELETED", this);
    }
    
    get remainingTime() {
        return this.remaining.toISOString();
    }
}