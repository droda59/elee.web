import {Router} from "aurelia-router";
import {autoinject, inject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {EventAggregator} from "aurelia-event-aggregator";

// @autoinject
@inject(Router, I18N, Element, EventAggregator)
export class About extends BaseI18N {
  private _router: Router;
  private _element: Element;

  constructor(router: Router, i18n: I18N, element: Element, ea: EventAggregator) {
    super(i18n, element, ea);

    this._router = router;
    this._element = element;
  }

  activate(route, routeConfig) {
    // Nothin' yet
  }
}
