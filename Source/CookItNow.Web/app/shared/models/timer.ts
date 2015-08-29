import {EventAggregator} from "aurelia-event-aggregator";
import {computedFrom} from "aurelia-framework"; 

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
        
        this.initialize();
    }
    
    start() {
        if (!this.timer) {
            this._eventAggregator.publish("TIMERSTARTED", this);
            this.play();
        }
    }
    
    replay() {
        this.initialize();
        this.play();
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
        return this._remainingSeconds;
    }
    
    @computedFrom("_originalSeconds")
    get originalTime() {
        return this._originalSeconds;
    }
    
    private initialize() {
		var original = moment.duration(this.duration);
        this._remainingSeconds = moment.duration(original).asSeconds();
        this._originalSeconds = original.asSeconds();
    }
}