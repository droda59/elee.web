import {bindable, inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {HttpClient} from "aurelia-http-client";
import {I18N} from "aurelia-i18n";
import {SettingsManager} from "app/shared/settings-manager";
import {SettingsModal} from "app/shared/components/settings-modal";

@inject (HttpClient, DialogService, SettingsManager, I18N)
export class QuickRecipeHeader {
	@bindable recipeId: string = null;

	private _dialogService: DialogService;
	private _settingsManager: SettingsManager;
    private _http: HttpClient;
	private _i18n: I18N;

	constructor(http: HttpClient, dialogService: DialogService, settingsManager: SettingsManager, i18n: I18N) {
		this._http = http;
		this._i18n = i18n;
		this._dialogService = dialogService;
		this._settingsManager = settingsManager;
	}

	attached(): void {
	    $(".tooltipped").tooltip({ delay: 50 });
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

	reportRecipe(): void {
		this._http
            .put("http://eleeapi.azurewebsites.net/api/review/flag/" + this.recipeId)
            .then(response => {
                Materialize.toast(this._i18n.tr("quickRecipe.recipeFlagged"), 3000)
            });
	}
}
