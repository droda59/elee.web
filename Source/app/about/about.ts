import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n";

@inject(Router, I18N)
export class About {
    private _router: Router;
    private _i18n: I18N;

    constructor(router: Router, i18n: I18N) {
        this._router = router;
        this._i18n = i18n;
    }

    activate(route, routeConfig) {
        // Nothin' yet
    }
}