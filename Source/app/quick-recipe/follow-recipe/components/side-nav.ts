import {autoinject, bindable} from "aurelia-framework";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {MdToastService} from "aurelia-materialize-bridge";
import {QuickRecipeService} from "app/quick-recipe/shared/quick-recipe-service";
import {QuickRecipeSubrecipe} from "app/quick-recipe/follow-recipe/models/quick-recipe-subrecipe";
import {SettingsManager} from "app/shared/settings-manager";

@autoinject()
export class SideNav {
    private _service: QuickRecipeService;
    private _i18n: I18N;
    private _toast: MdToastService;
    private _router: Router;

    @bindable uniqueName: string = "";
    @bindable subrecipes: Array<QuickRecipeSubrecipe> = [];

    selectedVolumeDisplay: string;
    selectedWeightDisplay: string;

    constructor(service: QuickRecipeService, router: Router, i18n: I18N, toast: MdToastService, settingsManager: SettingsManager) {
        this._service = service;
        this._router = router;
        this._i18n = i18n;
        this._toast = toast;

        this.selectedVolumeDisplay: settingsManager.settings.selectedVolumeDisplay;
        this.selectedWeightDisplay: settingsManager.settings.selectedWeightDisplay;
    }

    reportRecipe(): void {
        this._service.report(this.uniqueName)
            .then(response => {
                this._toast.show(this._i18n.tr("quickRecipe.recipeFlagged"), 3000);
            });
    }

    editRecipe(): void {
        this._router.navigateToRoute("edit", { "uniqueName": this.uniqueName }, undefined);
    }
}
