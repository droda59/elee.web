import {bindable, inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {SettingsManager} from "shared/settings-manager";
import {SettingsModal} from "shared/components/settings-modal";

@inject (DialogService, SettingsManager)
export class QuickRecipeHeader {
	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;

	constructor(dialogService: DialogService, settingsManager: SettingsManager) {
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
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
