import {Timer} from "interfaces/timer";

export class StepTimer {
	timer: Timer;
	
	activate(model: Timer) {
		this.timer = model;
	}
}