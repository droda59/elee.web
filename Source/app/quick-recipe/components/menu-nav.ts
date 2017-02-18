import { autoinject, bindable } from "aurelia-framework";
import { I18N } from "aurelia-i18n";
import { MdToastService } from "aurelia-materialize-bridge";
import { QuickRecipeService } from "app/quick-recipe/quick-recipe-service";

@autoinject()
export class MenuNav {
    @bindable uniqueName: string = "";

    isAdmin: boolean;

    private _service: QuickRecipeService;
    private _i18n: I18N;
    private _toast: MdToastService;

    constructor(service: QuickRecipeService, i18n: I18N, toast: MdToastService) {
        this._service = service;
        this._i18n = i18n;
        this._toast = toast;
    }

    reportRecipe(): void {
        this._service.report(this.uniqueName)
            .then(response => {
                this._toast.show(this._i18n.tr("quickRecipe.recipeFlagged"), 3000);
            });
    }
}
