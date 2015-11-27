import {Timer} from "shared/models/timer";
import {TimerPart} from "quick-recipe/models/quick-recipe";
import {TimerCoordinator} from "shared/timer-coordinator";
import {inject} from "aurelia-framework";

@inject (TimerCoordinator)
export class StepTimer {
	timer: Timer;
	
	private _timerCoordinator: TimerCoordinator;
	
	constructor(timerCoordinator: TimerCoordinator) {
		this._timerCoordinator = timerCoordinator;
	}
	
	activate(model: TimerPart) {
        this.timer = new Timer(this._timerCoordinator, model.value, model.action);
	}
}