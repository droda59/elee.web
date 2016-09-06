import {autoinject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject
export class PageFooter extends BaseI18N {
  private _i18n: I18N;
  private _element: Element;

  constructor(i18n: I18N, element: Element, ea: EventAggregator) {
    super(i18n, element, ea);

    this._i18n = i18n;
    this._element = element;
  }
}
