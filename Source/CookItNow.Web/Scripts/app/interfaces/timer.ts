import {EventAggregator} from "aurelia-event-aggregator";

export class Timer {
    duration: string;
    action: string;
    isPaused: boolean;
    isAlmostDone: boolean;
    isAlmosterDone: boolean;
    original: number;
    remaining: number;
    timer: number;
	eventAggregator: EventAggregator;
	
    constructor(eventAggregator: EventAggregator, duration: string, action: string) {
		this.eventAggregator = eventAggregator;
        this.duration = duration;
        this.action = action;
        this.isPaused = true;
        this.original = 30;
        this.remaining = this.original;
        this.isAlmostDone = false;
        this.isAlmosterDone = false;
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
                that.remaining--;
                
                that.isAlmostDone = that.remaining < ((that.original / 100) * 20);
                that.isAlmosterDone = that.remaining < ((that.original / 100) * 10);
                
                if (that.remaining <= 0) {
                    that.isPaused = true;
                }
            }
        }, 1000);
    }
    
    delete() {
        clearInterval(this.timer);
        this.eventAggregator.publish("TIMERDELETED", this);
    }
}