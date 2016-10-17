import { Router } from "aurelia-router";
import { autoinject, inject } from "aurelia-framework";
import { I18N, BaseI18N } from "aurelia-i18n";
import { EventAggregator } from "aurelia-event-aggregator";

// @autoinject
@inject(Router, I18N, Element, EventAggregator)
export class About extends BaseI18N {
	constructor(private router: Router,
							private i18n: I18N,
							private element: Element,
							ea: EventAggregator) {
		super(i18n, element, ea);
	}

	activate(route, routeConfig) {
		// Nothin' yet
	}
}
