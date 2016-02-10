import {bindable, inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {Validation} from "aurelia-validation";
import {QuickRecipe} from "quick-recipe/models/quick-recipe";
import {TimerCoordinator} from "quick-recipe/timer-coordinator";
import {Timer} from "shared/models/timer";
import {SettingsManager} from "shared/settings-manager";
import {SettingsModal} from "shared/components/settings-modal";

@inject (TimerCoordinator, DialogService, SettingsManager, Validation)
export class QuickRecipeHeader {
	@bindable recipe: QuickRecipe = null;

	activeTimersSectionActive: boolean = false;
	timerCoordinator: TimerCoordinator;

	private _validation: Validation;
	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;

	constructor(timerCoordinator: TimerCoordinator, dialogService: DialogService, settingsManager: SettingsManager, validation: Validation) {
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
		this._validation = validation;
		this.timerCoordinator = timerCoordinator;
	}

	toggleMinimizeActiveTimers(): void {
		this.activeTimersSectionActive = !this.activeTimersSectionActive;
	}

	addTimer(): void {
		var timer = new Timer();
		timer.isEditingDescription = true;
		timer.validation = this._validation.on(timer, (config) => { config.useDebounceTimeout(150) });
		timer.validation.validate().catch((t) => {});

		this.timerCoordinator.addTimer(timer);
	}

	startTimer(timer: Timer): void {
		timer.validation
			.validate()
			.then(() => {
	  			this.timerCoordinator.startTimer(timer);
	      	});
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
