export class StepAction {
	action: string;
	
	activate(model: string) {
        this.action = model;
	}
}
