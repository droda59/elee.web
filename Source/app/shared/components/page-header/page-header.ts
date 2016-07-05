import {I18N} from "aurelia-i18n";
import {inject} from "aurelia-framework";

@inject(I18N, Element)
export class PageHeader {
    private _i18n: I18N;
    private _element: Element;

    constructor(i18n: I18N, element: Element) {
        this._i18n = i18n;
        this._element = element;
    }

    changeLocale(): void {
        var newLocale;
        var currentLocale = this._i18n.getLocale();
        if (currentLocale === "fr") {
            newLocale = "en";
        } else if (currentLocale === "en") {
            newLocale = "fr";
        }

        this._i18n
            .setLocale(newLocale)
            .then(() => {
                this._i18n.updateTranslations(this._element);
            });
    }
}