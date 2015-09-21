import {TextPart} from "quick-recipe/models/quick-recipe";

export class StepText {
	value: string;
	
	activate(model: TextPart) {
        this.value = model.value;
	}
}
