import {Timer} from "shared/models/timer";
import {TimerPart} from "quick-recipe/models/quick-recipe";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";
import {inject} from "aurelia-framework";

@inject (TimerCoordinator)
export class StepTimer {
	timer: Timer;

	private _stepId;
	private _timerCoordinator: TimerCoordinator;

	constructor(timerCoordinator: TimerCoordinator) {
		this._timerCoordinator = timerCoordinator;
	}

	activate(model: TimerPart) {
        this.timer = new Timer(model.value, model.action, model.text);
		this._stepId = model.stepId;
	}

	startTimer(): void {
		if (this.timer.isStopped) {
			this._timerCoordinator.startTimer(this._stepId, this.timer);
		}
	}
}
