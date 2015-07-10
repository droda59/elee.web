import {Step} from "models/quick-recipe";

export class StepItem {
	step: Step;
	
	activate(model: Step) {
        this.step = model;
	}
}
