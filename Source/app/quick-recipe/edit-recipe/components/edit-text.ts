import {TextPart} from "app/quick-recipe/shared/models/quick-recipe";

export class StepText {
    part: TextPart;

    activate(model: TextPart) {
        this.part = model;
    }
}
