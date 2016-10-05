import {ActionPart} from "app/quick-recipe/shared/models/quick-recipe";

export class StepAction {
    part: ActionPart;

    activate(model: ActionPart) {
        this.part = model;
    }
}
