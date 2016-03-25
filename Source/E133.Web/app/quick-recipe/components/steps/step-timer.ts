import {inject} from "aurelia-framework";
import {QuickRecipeTimer} from "quick-recipe/models/quick-recipe-timer";
import {TimerPart} from "quick-recipe/models/quick-recipe";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";

@inject (TimerCoordinator)
export class StepTimer {
	timer: QuickRecipeTimer;

	private _timerCoordinator: TimerCoordinator;

	constructor(timerCoordinator: TimerCoordinator) {
		this._timerCoordinator = timerCoordinator;
	}

	activate(model: TimerPart) {
        this.timer = new QuickRecipeTimer(model.stepId, model.value, model.action, model.text);
	}

	startTimer(): void {
		if (this.timer.isStopped) {
			this._timerCoordinator.startTimer(this.timer);
		}
	}
}
