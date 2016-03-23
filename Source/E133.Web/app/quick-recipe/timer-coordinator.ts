import {inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {Timer} from "shared/models/timer";

@inject (I18N)
export class TimerCoordinator {
	private _i18n: I18N;

	activeTimers: Timer[] = [];
	onTimerStarted;
	onTimerEnded;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

	startTimer(stepId: number, timer: Timer): void {
		var that = this;
		this.addTimer(timer);

		timer.start();
		if (this.onTimerStarted) {
			this.onTimerStarted(stepId);
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
					this.onTimerEnded(stepId);
				}
			}
		}
	}

	addTimer(timer: Timer): void {
		if (this.activeTimers.indexOf(timer) === -1) {
			this.activeTimers.push(timer);
		}
	}

	deleteTimer(timer: Timer): void {
		var index = this.activeTimers.indexOf(timer);
		this.activeTimers.splice(index, 1);

		timer.delete();
		timer.onFinish = null;
	}

	clear(): void {
		var timers = this.activeTimers.slice(0);
		timers.forEach(timer => {
			this.deleteTimer(timer);
		});
	}
}
