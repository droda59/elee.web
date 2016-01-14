import {bindable, autoinject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {TimerCoordinator} from "shared/timer-coordinator";
import {QuickRecipe} from "quick-recipe/models/quick-recipe";
import {Timer} from "shared/models/timer";
import {SettingsManager} from "shared/settings-manager";
import {SettingsModal} from "shared/components/settings-modal";

@autoinject
export class QuickRecipeHeader {
	@bindable recipe: QuickRecipe = null;

	activeTimersSectionActive: boolean = false;
	timerCoordinator: TimerCoordinator;

	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;

	constructor(timerCoordinator: TimerCoordinator, dialogService: DialogService, settingsManager: SettingsManager) {
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
		this.timerCoordinator = timerCoordinator;
	}

	toggleMinimizeActiveTimers(): void {
		this.activeTimersSectionActive = !this.activeTimersSectionActive;
	}

	addTimer(): void {
		var newTimer = new Timer();
		newTimer.isEditingDescription = true;

		this.timerCoordinator.addTimer(newTimer);
	}

	startTimer(timer: Timer): void {
		this.timerCoordinator.startTimer(timer);
	}

	removeTimer(timer: Timer): void {
		this.timerCoordinator.deleteTimer(timer);
	}

	editSettings(): void {
		this._dialogService
			.open({ viewModel: SettingsModal, model: this._settingsManager.settings})
			.then((result) => {
				if (!result.wasCancelled) {
					this._settingsManager.save(result.output);
				}
			});
	}
}
