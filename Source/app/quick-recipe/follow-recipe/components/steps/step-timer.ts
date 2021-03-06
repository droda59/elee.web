import {inject} from "aurelia-framework";
import {TimerPart} from "app/quick-recipe/models/quick-recipe";
import {TimerCoordinator} from "app/quick-recipe/follow-recipe/timer-coordinator";
import {QuickRecipeTimer} from "app/quick-recipe/follow-recipe/models/quick-recipe-timer";

@inject(TimerCoordinator)
export class StepTimer {
  timer: QuickRecipeTimer;

  private _timerCoordinator: TimerCoordinator;

  constructor(timerCoordinator: TimerCoordinator) {
    this._timerCoordinator = timerCoordinator;
  }

  activate(model: TimerPart) {
    this.timer = new QuickRecipeTimer(model.stepId, model.value, model.action, model.text);
  }

  startTimer(): void {
    if (this.timer.isStopped) {
      this._timerCoordinator.startTimer(this.timer);
    }
  }
}
