import {EventAggregator} from "aurelia-event-aggregator";
import {computedFrom} from "aurelia-framework"; 
import * as moment from "moment";

export class Timer {
	private _eventAggregator: EventAggregator;
    private _originalSeconds: number;
    private _remainingSeconds: number;
    duration: string;
    action: string;
    isPaused: boolean;
    state: string;
    timer: number;
	
    constructor(eventAggregator: EventAggregator, duration: string, action: string) {
		this._eventAggregator = eventAggregator;
        this.duration = duration;
        this.action = action;
        this.isPaused = true;
        this.state = "original";
        
		var original = moment.duration(duration);
        this._remainingSeconds = moment.duration(original).asSeconds();
        this._originalSeconds = original.asSeconds();
    }
    
    start() {
        if (!this.timer) {
            this._eventAggregator.publish("TIMERSTARTED", this);
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
                    that._remainingSeconds--;
                    
                    that.state = that._remainingSeconds < ((that._originalSeconds / 100) * 20) 
                        ? that._remainingSeconds < ((that._originalSeconds / 100) * 10)
                            ? "isAlmosterDone"
                            : "isAlmostDone"
                        : "original";
                    
                    if (that._remainingSeconds <= 0) {
                        that.isPaused = true;
                    }
                }
            }, 1000);
        }
    }
    
    delete() {
        clearInterval(this.timer);
        this.timer = null;
        this._eventAggregator.publish("TIMERDELETED", this);
    }
    
    @computedFrom("_remainingSeconds")
    get remainingTime() {
        var sec_num = this._remainingSeconds;
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        return (hours ? (hours < 10 ? "0" + hours : hours) + ":" : "") 
            + (minutes < 10 ? "0" + minutes : minutes) + ":" 
            + (seconds < 10 ? "0" + seconds : seconds);
    }
}