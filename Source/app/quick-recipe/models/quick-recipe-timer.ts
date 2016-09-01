import {Timer} from "app/shared/models/timer";

export class QuickRecipeTimer extends Timer {
  stepId: number;

  constructor(stepId: number, duration?: string, action?: string, text?: string) {
    super(duration, action, text);

    this.stepId = stepId;
  }
}
