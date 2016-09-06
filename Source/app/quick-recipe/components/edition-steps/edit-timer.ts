import {TimerPart} from "app/quick-recipe/models/quick-recipe";

export class StepTimer {
    timer: string;

    activate(model: TimerPart) {
        this.timer = model.value;
    }
}
