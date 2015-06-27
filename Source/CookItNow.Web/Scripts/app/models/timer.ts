import {EventAggregator} from "aurelia-event-aggregator";
import * as moment from "moment";

export class Timer {
	private eventAggregator: EventAggregator;
    private originalSeconds: number;
    duration: string;
    action: string;
    isPaused: boolean;
    state: string;
    original: moment.Duration;
    remaining: moment.Duration;
    timer: number;
	
    constructor(eventAggregator: EventAggregator, duration: string, action: string) {
		this.eventAggregator = eventAggregator;
        this.duration = duration;
        this.action = action;
        this.isPaused = true;
        this.state = "original";
        
		this.original = moment.duration(duration);
        this.remaining = moment.duration(this.original);
        
        this.originalSeconds = this.original.asSeconds();
    }
    
    start() {
        if (!this.timer) {
            this.eventAggregator.publish("TIMERSTARTED", this);
            this.play();
        }
    }
    
    pause() {
        this.isPaused = true;
    }
    
    play() {
        this.isPaused = false;
        
        if (!this.timer) {
            var that = this;
            this.timer = setInterval(function(){
                if (!that.isPaused) {
                    that.remaining.add(-1, "seconds");
                    
                    var remainingSeconds = that.remaining.asSeconds();
                    
                    that.state = remainingSeconds < ((that.originalSeconds / 100) * 20) 
                        ? remainingSeconds < ((that.originalSeconds / 100) * 10)
                            ? "isAlmosterDone"
                            : "isAlmostDone"
                        : "original";
                    
                    if (remainingSeconds <= 0) {
                        that.isPaused = true;
                    }
                }
            }, 1000);
        }
    }
    
    delete() {
        clearInterval(this.timer);
        this.timer = null;
        this.eventAggregator.publish("TIMERDELETED", this);
    }
    
    get remainingTime() {
        var sec_num = this.remaining.asSeconds();
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        return (hours ? (hours < 10 ? "0" + hours : hours) + ":" : "") 
            + (minutes < 10 ? "0" + minutes : minutes) + ":" 
            + (seconds < 10 ? "0" + seconds : seconds);
    }
}