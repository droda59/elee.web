import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DialogService} from "aurelia-dialog";
import {QuickRecipe} from "quick-recipe/models/quick-recipe";
import {Timer} from "shared/models/timer";
import {SettingsManager} from "shared/settings-manager";
import {SettingsModal} from "shared/components/settings-modal";

@inject (EventAggregator, DialogService, SettingsManager)
export class QuickRecipeHeader {
	@bindable recipe: QuickRecipe = null;
	
	activeTimers: Timer[] = [];
	recipeInfoSectionActive: boolean = false;	
	activeTimersSectionActive: boolean = false;
	
	private _eventAggregator: EventAggregator;
	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;
	
	constructor(eventAggregator: EventAggregator, dialogService: DialogService, settingsManager: SettingsManager) {
		this._eventAggregator = eventAggregator;
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
	}
	
    attached() {
		this._eventAggregator.subscribe("TIMERSTARTED", payload => {
			if (this.activeTimers.indexOf(payload) === -1) {
				this.activeTimers.push(payload);
			}
		});
		
		this._eventAggregator.subscribe("TIMERDELETED", payload => {
			var index = this.activeTimers.indexOf(payload);
			this.activeTimers.splice(index, 1);
			if (!this.activeTimers.length) {
				this.activeTimersSectionActive = false;
			}
		});
    }
	
	toggleMinimizeActiveTimers() {
			this.activeTimersSectionActive = !this.activeTimersSectionActive; 
	}
	
	toggleMinimizeRecipeInfo() {
		this.recipeInfoSectionActive = !this.recipeInfoSectionActive; 
	}
	
	editSettings() {
		this._dialogService
			.open({ viewModel: SettingsModal, model: this._settingsManager.settings})
			.then((settings) => {
				this._settingsManager.save(settings);
			});
	}
}