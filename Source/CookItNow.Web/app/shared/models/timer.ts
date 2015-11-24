import {computedFrom} from "aurelia-framework"; 
import {TimerCoordinator} from "shared/timer-coordinator";

export class Timer {
    private _timerCoordinator: TimerCoordinator;
    private _originalSeconds: number;
    private _remainingSeconds: number;
    duration: string;
    action: string;
    isStopped: boolean;
    state: string;
    timer: number;
	
    constructor(timerCoordinator: TimerCoordinator, duration: string, action: string) {
        this._timerCoordinator = timerCoordinator;
        this.duration = duration;
        this.action = action;
        this.isStopped = true;
        this.state = "original";
        
        this.initialize();
    }
    
    start() {
        if (!this.timer) {
            this._timerCoordinator.startTimer(this);
            this.play();
        }
    }
    
    replay() {
        this.initialize();
        this.play();
    }
    
    play() {
        this.isStopped = false;
        
        if (!this.timer) {
            var that = this;
            this.timer = setInterval(function(){
                if (!that.isStopped) {
                    that._remainingSeconds--;
                    
                    that.state = that._remainingSeconds < ((that._originalSeconds / 100) * 20) 
                        ? that._remainingSeconds < ((that._originalSeconds / 100) * 10)
                            ? "isAlmosterDone"
                            : "isAlmostDone"
                        : "original";
                    
                    if (that._remainingSeconds <= 0) {
                        that.isStopped = true;
                    }
                }
            }, 1000);
        }
    }
    
    delete() {
        clearInterval(this.timer);
        this.timer = null;
        this._timerCoordinator.deleteTimer(this);
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