import {bindable, inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {TimerCoordinator} from "shared/timer-coordinator";
import {QuickRecipe} from "quick-recipe/models/quick-recipe";
import {Timer} from "shared/models/timer";
import {SettingsManager} from "shared/settings-manager";
import {SettingsModal} from "shared/components/settings-modal";

@inject (TimerCoordinator, DialogService, SettingsManager)
export class QuickRecipeHeader {
	@bindable recipe: QuickRecipe = null;

	recipeInfoSectionActive: boolean = false;
	activeTimersSectionActive: boolean = false;
	isEditingTimer: boolean = false;
	timerCoordinator: TimerCoordinator;

	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;

	constructor(timerCoordinator: TimerCoordinator, dialogService: DialogService, settingsManager: SettingsManager) {
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
		this.timerCoordinator = timerCoordinator;
	}

	toggleMinimizeActiveTimers() {
		this.activeTimersSectionActive = !this.activeTimersSectionActive;
	}

	addTimer():void {
		var newTimer = new Timer();
		newTimer.isEditionMode = true;

		this.isEditingTimer = true;
		this.timerCoordinator.addTimer(newTimer);
	}

	startTimer(timer: Timer):void {
		if (timer.isEditionMode) {
			timer.isEditionMode = false;
			this.isEditingTimer = false;
		}

		this.timerCoordinator.startTimer(timer);
	}

	removeTimer(timer: Timer):void {
		if (timer.isEditionMode) {
			timer.isEditionMode = false;
			this.isEditingTimer = false;
		}
		
		this.timerCoordinator.deleteTimer(timer);
	}

	editSettings() {
		this._dialogService
			.open({ viewModel: SettingsModal, model: this._settingsManager.settings})
			.then((result) => {
				if (!result.wasCancelled) {
					this._settingsManager.save(result.output);
				}
			});
	}
}
