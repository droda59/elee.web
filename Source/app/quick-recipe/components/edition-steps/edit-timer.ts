import {TimerPart} from "app/quick-recipe/models/quick-recipe";

export class StepTimer {
    part: TimerPart;

    activate(model: TimerPart) {
        this.part = model;
    }
}
