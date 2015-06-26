import {Timer} from "models/timer";

export class StepTimer {
	timer: Timer;
	
	activate(model: Timer) {
		this.timer = model;
	}
}