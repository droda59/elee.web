import {autoinject, bindable} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {I18N, BaseI18N} from "aurelia-i18n";

@autoinject
export class AdvancedSearch extends BaseI18N {
  @bindable time: string|null;
  @bindable ingredients: string[] = [];

  private _i18n: I18N;
  private _element: Element;

  constructor(i18n: I18N, element: Element, ea: EventAggregator) {
    super(i18n, element, ea);

    this._i18n = i18n;
    this._element = element;
  }
}
