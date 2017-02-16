import { autoinject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { Configure } from "aurelia-configuration";
import { MdToastService } from "aurelia-materialize-bridge";
import { QuickRecipeService } from "app/quick-recipe/quick-recipe-service";

@autoinject()
export class MenuNav {
    private _service: QuickRecipeService;
    private _i18n: I18N;
    private _toast: MdToastService;
    private _router: Router;

    @bindable uniqueName: string = "";

    isAdmin: boolean;

    constructor(service: QuickRecipeService, router: Router, i18n: I18N, toast: MdToastService, configure: Configure) {
        this._service = service;
        this._router = router;
        this._i18n = i18n;
        this._toast = toast;

        this.isAdmin = configure.is("development");
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
