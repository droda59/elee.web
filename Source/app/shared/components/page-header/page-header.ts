import {autoinject, inject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {EventAggregator} from "aurelia-event-aggregator";

// @autoinject
@inject (I18N, Element, EventAggregator)
export class PageHeader extends BaseI18N {
    private _i18n: I18N;
    private _element: Element;

    constructor(i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

        this._i18n = i18n;
        this._element = element;
    }

	attached() {
        $(".button-collapse").sideNav({
            edge: 'left'
        });
    }

    public changeLocale(): void {
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