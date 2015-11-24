import {Timer} from "shared/models/timer";

export class TimerCoordinator {
	activeTimers: Timer[] = [];
	
	startTimer(timer: Timer) {
		if (this.activeTimers.indexOf(timer) === -1) {
			this.activeTimers.push(timer);
		}
	}
	
	deleteTimer(timer: Timer) {
		var index = this.activeTimers.indexOf(timer);
		this.activeTimers.splice(index, 1);
	}
}
