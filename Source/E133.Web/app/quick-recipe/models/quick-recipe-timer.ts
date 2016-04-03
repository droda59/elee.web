import {Timer} from "app/shared/models/timer";

export class QuickRecipeTimer extends Timer {
    stepId: number;

    constructor(stepId: number, duration?: string, action?: string, text?: string) {
        this.stepId = stepId;

        super(duration, action, text);
    }
}
