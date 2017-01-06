import {TextPart} from "app/quick-recipe/models/quick-recipe";

export class StepText {
    part: TextPart;

    activate(model: TextPart) {
        this.part = model;
    }
}
