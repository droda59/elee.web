import {inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {QuickRecipeTimer} from "app/quick-recipe/models/quick-recipe-timer";

@inject(I18N)
export class TimerCoordinator {
  private _i18n: I18N;

  onTimerStarted;
  onTimerEnded;

  constructor(i18n: I18N) {
    this._i18n = i18n;
  }

  startTimer(timer: QuickRecipeTimer): void {
    var that = this;

    timer.start();
    if (this.onTimerStarted) {
      this.onTimerStarted(timer);
    }

    if (!timer.onFinish) {
      timer.onFinish = () => {
        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            var options = {
              body: timer.action
            }

            new Notification(that._i18n.tr("quickRecipe.timerEnded", null), options);
          }
        }

        if (this.onTimerEnded) {
          this.onTimerEnded(timer);
        }
      }
    }
  }

  deleteTimer(timer: QuickRecipeTimer): void {
    timer.delete();
    timer.onFinish = null;
  }
}
